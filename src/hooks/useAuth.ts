import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export interface AuthUser extends User {
  isAnonymous: boolean;
  role?: string;
}

// Demo mode implementation - doesn't require Firebase
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // In demo mode, create a mock user
    const initializeUser = async () => {
      try {
        // Check if Firebase is properly configured
        const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
          !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('DEMO');

        if (!hasFirebaseConfig) {
          // Create demo user for development
          const demoUser = {
            uid: 'demo-user-' + Date.now(),
            email: 'demo@example.com',
            displayName: 'デモユーザー',
            isAnonymous: true,
            role: 'user',
            emailVerified: false,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: null,
            delete: async () => {},
            getIdToken: async () => 'demo-token',
            getIdTokenResult: async () => ({ token: 'demo-token', claims: {} } as any),
            reload: async () => {},
            toJSON: () => ({})
          } as AuthUser;

          setUser(demoUser);
          setLoading(false);
          return;
        }

        // If Firebase is configured, use real auth
        const { auth, db } = await import('@/lib/firebase');
        const { onAuthStateChanged, signInAnonymously } = await import('firebase/auth');
        const { doc, setDoc, getDoc, serverTimestamp } = await import('firebase/firestore');

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            
            if (!userDoc.exists()) {
              await setDoc(doc(db, 'users', firebaseUser.uid), {
                email: firebaseUser.email,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                role: 'user',
                isAnonymous: firebaseUser.isAnonymous,
                consentFlags: {
                  terms: true,
                  privacy: true,
                  notifications: false
                }
              });
            }

            const userData = userDoc.data();
            setUser({
              ...firebaseUser,
              isAnonymous: firebaseUser.isAnonymous,
              role: userData?.role || 'user'
            } as AuthUser);
          } else {
            // Auto sign in anonymously
            const result = await signInAnonymously(auth);
            setUser({
              ...result.user,
              isAnonymous: true,
              role: 'user'
            } as AuthUser);
          }
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        setError(err.message);
        
        // Fallback to demo user on error
        const demoUser = {
          uid: 'demo-user-' + Date.now(),
          email: 'demo@example.com',
          displayName: 'デモユーザー',
          isAnonymous: true,
          role: 'user',
          emailVerified: false,
          metadata: {},
          providerData: [],
          refreshToken: '',
          tenantId: null,
          delete: async () => {},
          getIdToken: async () => 'demo-token',
          getIdTokenResult: async () => ({ token: 'demo-token', claims: {} } as any),
          reload: async () => {},
          toJSON: () => ({})
        } as AuthUser;

        setUser(demoUser);
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const signInAnon = async () => {
    try {
      setError(null);
      // In demo mode, just return the existing user
      if (user) return user;
      
      // Create new demo user
      const demoUser = {
        uid: 'demo-user-' + Date.now(),
        email: 'demo@example.com',
        displayName: 'デモユーザー',
        isAnonymous: true,
        role: 'user',
      } as AuthUser;
      
      setUser(demoUser);
      return demoUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setError('Demo mode: Email sign-in is not available');
    return user;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setError('Demo mode: Email sign-up is not available');
    return user;
  };

  const signInWithGoogle = async () => {
    setError('Demo mode: Google sign-in is not available');
    return user;
  };

  const signOut = async () => {
    try {
      setError(null);
      setUser(null);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    setError('Demo mode: Password reset is not available');
  };

  return {
    user,
    loading,
    error,
    signInAnon,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword
  };
}