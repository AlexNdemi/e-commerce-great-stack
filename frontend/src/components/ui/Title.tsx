import {type FC} from 'react'
import { useTheme } from '../../hooks/useTheme'
interface TitleProps{
  text1:string,
  text2:string
}
const Title:FC <TitleProps>= ({text1,text2}) => {
  const {theme} = useTheme();
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className={`${theme ==="dark"?"text-textDark-100":"text-textLight-100"}`}>{text1} <span className={`${theme === "dark"?"text-textDark-900":"text-textLight-900"}  font-medium`}>{text2}</span></p>
      <p className={`w-8 sm:w-12 h-[1px] sm:h-[2px] ${theme === "dark"?"bg-textDark-900":"bg-textLight-900"} `}></p>
      
    </div>
  )
}

export default Title
