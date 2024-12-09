// app/components/providers/AuthProvider.js
'use client'

import { SessionProvider } from 'next-auth/react'

export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider;  // Ajoutez cette ligne pour permettre l'import par défaut