import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;   
  skeletonBaseColor?: string;
  skeletonHighlightColor?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  imageClassName,
  skeletonBaseColor,
  skeletonHighlightColor,
}: ImageWithSkeletonProps) { 
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <Skeleton
          className={className}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageClassName} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
