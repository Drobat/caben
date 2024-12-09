// app/layout.js
import '@/styles/globals.css';
import NavBar from '@/components/NavBar';
import { AuthProvider } from '@/components/providers/AuthProvider';

export const metadata = {
  title: "CABEN",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-[#1D232A]">
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}