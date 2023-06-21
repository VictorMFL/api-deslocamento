import '../globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Cadastro',
  description: 'Website register page',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
