import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  clickHandler?:()=>void   
 
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  clickHandler,
  imageClassName,
  
}: ImageWithSkeletonProps) { 
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const {theme}=useTheme()
  const baseColor = theme === "dark" ? "#202020" : "#ebebeb"; 
  const highlightColor = theme === "dark" ? "#444" : "#f5f5f5";

  return (
    <div className={`${className} relative overflow-hidden`} >
      {!(loaded || error) &&  (
        <Skeleton
          className="w-full h-full"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
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
        className={`w-full h-full object-cover ${imageClassName} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => {
            setLoaded(false);
            setError(true);  
        }}
      />
    </div>
  );
}
