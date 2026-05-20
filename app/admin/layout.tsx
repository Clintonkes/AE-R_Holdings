import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Admin Panel | AE$R Holdings',
    template: '%s | AE$R Holdings Admin',
  },
  description: 'AE$R Holdings admin management panel.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
