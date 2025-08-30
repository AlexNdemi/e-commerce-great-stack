import { type FC,type ReactNode } from "react";
import { type Theme, type ThemeContextType } from "./ThemeTypes";
import { ThemeContext } from "./ThemeContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const ThemeProvider:FC<{children:ReactNode}>=({children})=>{
  
  const [theme,setTheme] = useLocalStorage<Theme>('theme',()=>{
     return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  function toggleTheme():void{
    setTheme(theme === 'dark'? 'light':'dark')
  }

   document.documentElement.setAttribute("data-theme", theme);

  return <ThemeContext.Provider value={{theme,toggleTheme} as ThemeContextType}>
    {children}
  </ThemeContext.Provider>


}