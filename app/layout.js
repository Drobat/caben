// app/layout.js
import '../styles/globals.css';           // Notez le changement de './' à '../'
import NavBar from '../components/NavBar.js';  // Ajout de l'extension .js et changement du chemin
import { AuthProvider } from '../components/providers/AuthProvider.js';  // Chemin complet avec extension

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>CABEN</title>
      </head>
      <body className="bg-[#1D232A]">
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}