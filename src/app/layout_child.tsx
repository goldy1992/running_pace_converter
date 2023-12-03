import { Inter } from "next/font/google"
import { Props } from "./props"
import { useContext } from "react"
import { IsDarkModeContext } from "./dark_mode_context"


const inter = Inter({ subsets: ['latin'] })

export default function RootChild({children}: Props
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
            {/* <div className='bg-neutral-100 dark:bg-neutral-900'> */}
              {children}
            {/* </div> */}
          </body>
      </html>
  
  );
  }
