import {type FC} from 'react';
import Title from './Title';
interface SectionProps{
  description:string
  text1:string
  text2:string
}

const CollectionHeader:FC<SectionProps> = ({description,text1,text2}) => {

  return (
     <div className=''>
      <div className="text-center py-4 text-3xl">
        <Title text1={text1}text2={text2}/>
        <p className={`w-3/4 m-auto text-xs sm:text-sm md:text-base`}>{description}</p>
      </div>
    </div>

  )
}

export default CollectionHeader
