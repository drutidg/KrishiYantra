import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KrishiYantra — Know your slot. Skip the wait.',
  description:
    'Real-time agricultural procurement queue and slot management platform for farmers and procurement centers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#F9FBF7] text-[#1F2937]">
        {children}
      </body>
    </html>
  );
}
