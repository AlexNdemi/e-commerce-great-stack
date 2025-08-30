import { useContext } from 'react'
import  {type ThemeContextType} from '../context/theme/ThemeTypes'
import { ThemeContext } from '../context/theme/ThemeContext'
export function useTheme ():ThemeContextType{
  const context = useContext(ThemeContext);
  if(!context){
    throw new Error("useTheme must be used within a ThemeProvider");
    
  }
  return context;

}