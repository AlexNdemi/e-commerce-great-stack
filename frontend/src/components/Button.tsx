import { useTheme } from "../hooks/useTheme"


const Button:React.FC = () => {
  const {theme, toggleTheme}=useTheme()
  return (
    <button 
      className={`${theme === 'dark' ? 'bg-amber-500 text-gray-950':'bg-black  text-white'}`}
      onClick={toggleTheme}
      >hello world
      
    </button>
  )
}

export default Button
