'use client'
import './globals.css'
import { DarkModeProvider, IsDarkModeContext } from './dark_mode_context'
import { Inter } from 'next/font/google'
import { useContext } from 'react'
import { Props } from './props'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DarkModeProvider>
       <RootChild>
        {children}
      </RootChild>
    </DarkModeProvider>
  )
}


const inter = Inter({ subsets: ['latin'] })

export function RootChild(
    props: Props
) {
    const darkModeContext = useContext(IsDarkModeContext)
    var darkMode = darkModeContext.enabled
    const isDarkMode = darkMode ? "dark" : ""
    const htmlClass = isDarkMode + " scroll-smooth"
    const bodyClassName = 'bg-neutral-100 dark:bg-neutral-900 ' + inter.className
  return (

        <html lang="th" className={htmlClass}>
  
          <body className={bodyClassName}>
            <div id="home" />
            <div className='bg-neutral-100 dark:bg-neutral-900'>
              {props.children}
            </div>
          </body>
      </html>
  
  );
  }
