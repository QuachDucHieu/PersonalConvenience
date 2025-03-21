import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Suspense } from 'react';
import LoadingFallback from '@/components/common/LoadingFallback';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: "Personal Convenience",
  description: "Ứng dụng tiện ích cá nhân",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <StyledComponentsRegistry>
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
