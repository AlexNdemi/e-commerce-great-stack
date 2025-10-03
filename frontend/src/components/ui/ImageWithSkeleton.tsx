import { useTheme } from "../../hooks/useTheme";
import { useState } from "react";

interface ImageSkeletonProps{
  src:string;
  className:string;
  alt:string;
  imageClassName?:string;
  clickHandler?:()=>void
}

export const ImageWithSkeleton= ({src,className,alt,imageClassName,clickHandler}:ImageSkeletonProps) => {
  const {theme}=useTheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {!(loaded || error) && (
      <svg
          className={`${theme === 'dark'?'text-gray-600':'text-gray-200'} ${className} animate-pulse`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
       </svg>
      )}
    {error && (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            {/* Example: A simple icon or text */}
            <span className="text-sm text-gray-500">❌ Image Failed</span>
        </div>
      )}
      <img
        src={src}
        onClick={clickHandler}
        alt={alt}
        className={`${className} ${imageClassName} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => {
            setLoaded(false);
            setError(true);  
        }}
      />  
    </>
    
  )
}
