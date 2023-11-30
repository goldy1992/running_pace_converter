'use client'
import './globals.css'
import { DarkModeProvider, IsDarkModeContext } from './dark_mode_context'
import { Inter } from 'next/font/google'
import { useContext } from 'react'
import { Props } from './props'
import RootChild from './layout_child'

export default function RootLayout({
  children,
}: Props) : React.ReactNode {
  return (
    <DarkModeProvider>
       <RootChild>
        {children}
      </RootChild>
    </DarkModeProvider>
  )
}
