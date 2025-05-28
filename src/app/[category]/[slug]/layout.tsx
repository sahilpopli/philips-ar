import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function ProductLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
    </>
  );
} 