import '../styles/globals.css';
import NavBar from './components/NavBar';  // Importer la NavBar

export const metadata = {
  title: "CABEN", // Définir un titre par défaut
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> {/* Optionnel pour iOS */}
        <title>CABEN</title>
      </head>
      <body>
        <NavBar />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
