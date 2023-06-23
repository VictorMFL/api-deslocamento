import '../globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Home',
  description: 'Website home page',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
