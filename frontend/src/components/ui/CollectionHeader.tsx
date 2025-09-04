import {type FC} from 'react';
import Title from './Title';
import { useTheme } from '../../hooks/useTheme';
interface SectionProps{
  description:string
  text1:string
  text2:string
}

const CollectionHeader:FC<SectionProps> = ({description,text1,text2}) => {
  const{theme}=useTheme();

  return (
     <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <Title text1={text1}text2={text2}/>
        <p className={`w-3/4 m-auto text-xs sm:text-sm md:text-base ${theme === "dark"?"text-textDark-900": "text-gray-600"}`}>{description}</p>
      </div>
    </div>

  )
}

export default CollectionHeader
