import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'numeric',
      day: 'numeric',
    }).format(d);
  }
  
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(d);
}

export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}千`;
  }
  return num.toString();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function maskPII(text: string): string {
  // Mask email addresses
  text = text.replace(
    /([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
    (match, p1, p2) => {
      const maskedLocal = p1.charAt(0) + '*'.repeat(p1.length - 1);
      return `${maskedLocal}@${p2}`;
    }
  );
  
  // Mask phone numbers (Japanese format)
  text = text.replace(
    /(\d{2,4})-?(\d{2,4})-?(\d{4})/g,
    (match, p1, p2, p3) => {
      return `${p1}-****-****`;
    }
  );
  
  // Mask potential names (conservative approach)
  // This is a simplified version - in production, use a proper NER library
  text = text.replace(
    /(?:さん|様|先生|院長|Dr\.|ドクター)[\s]*[:：]?[\s]*([^\s、。,，.]+)/g,
    (match, name) => {
      return match.replace(name, '○○');
    }
  );
  
  return text;
}

export function detectNGWords(text: string): boolean {
  const ngWords = [
    // Add NG words here
    '死ね', '殺す', 'バカ', 'アホ', // Example offensive words
    // Medical misinformation keywords would go here
  ];
  
  const lowerText = text.toLowerCase();
  return ngWords.some(word => lowerText.includes(word.toLowerCase()));
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}