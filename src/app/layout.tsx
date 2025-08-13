import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '歯科衛生士コミュニティ | 毎日1分で学べる実践知識',
  description: '歯科衛生士のための学習・交流プラットフォーム。給与・税金・対人スキル・キャリアについて、毎日1分で役立つ情報を提供。',
  keywords: '歯科衛生士,DH,給与,税金,キャリア,対人スキル,勉強,コミュニティ',
  openGraph: {
    title: '歯科衛生士コミュニティ',
    description: '毎日1分で学べる歯科衛生士のための実践知識',
    type: 'website',
    locale: 'ja_JP',
    siteName: '歯科衛生士コミュニティ',
  },
  twitter: {
    card: 'summary_large_image',
    title: '歯科衛生士コミュニティ',
    description: '毎日1分で学べる実践知識',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-center"
            toastOptions={{
              className: 'font-sans',
              duration: 4000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}