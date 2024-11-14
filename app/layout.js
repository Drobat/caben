// app/layout.js
import '../styles/globals.css';
import NavBar from './components/NavBar';  // Importer la NavBar

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />  
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
