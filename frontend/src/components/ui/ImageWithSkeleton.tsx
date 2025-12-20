import { useState, useRef, useEffect } from "react";

interface ImageSkeletonProps {
  src: string;
  className: string;
  alt: string;
  imageClassName?: string;
  clickHandler?: () => void;
  lazy?: boolean;
  threshold?: number;
  rootMargin?: string;
  placeholderSrc?: string;
  placeholderBlur?: boolean;
  theme?: "light" | "dark";
}

const ImageLoadingFailed = () => (
  <svg
    className="w-12 h-12 text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const Image = ({
  src,
  className,
  alt,
  imageClassName = "",
  clickHandler,
  lazy = true,
  threshold = 0.1,
  rootMargin = "0px 0px 100px 0px",
  placeholderSrc,
  placeholderBlur = true,
  theme = "light"
}: ImageSkeletonProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer setup
  useEffect(() => {
    if (!lazy) {
      setInView(true);
      return;
    }

    if (!imgRef.current || !('IntersectionObserver' in window)) {
      // Fallback: load image immediately if IntersectionObserver not supported
      setInView(true);
      return;
    }

    const observerOptions = { threshold, rootMargin };
    const currentImgRef = imgRef.current;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observerRef.current.observe(currentImgRef);

    return () => {
      if (observerRef.current && currentImgRef) {
        observerRef.current.unobserve(currentImgRef);
      }
    };
  }, [lazy, threshold, rootMargin]);

  // Determine which src to use
  const displaySrc = inView ? src : (placeholderSrc || "");
  const shouldShowSkeleton = !loaded && !error && !placeholderSrc && !inView;
  const shouldBlurPlaceholder = placeholderSrc && !loaded && placeholderBlur;

  return (
    <div className={`relative ${className}`}>
      {/* Loading Skeleton - shows only when no placeholder and not in view/loaded */}
      {shouldShowSkeleton && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          } animate-pulse`}
        >
          <svg
            className={`w-1/3 h-1/3 ${
              theme === "dark" ? "text-gray-600" : "text-gray-300"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <ImageLoadingFailed />
          <span className="mt-2 text-sm text-gray-500">Image Failed to Load</span>
        </div>
      )}

      {/* Image - ALWAYS rendered for IntersectionObserver to work */}
      <img
        ref={imgRef}
        src={displaySrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
        onClick={clickHandler}
        alt={alt}
        className={`w-full h-full object-cover ${imageClassName} ${
          shouldBlurPlaceholder ? "blur-sm" : ""
        } transition-all duration-500 ${
          loaded ? "opacity-100 blur-0" : inView && !placeholderSrc ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => {
          if (inView && displaySrc && displaySrc !== "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") {
            setLoaded(true);
          }
        }}
        onError={() => {
          if (inView && displaySrc) {
            setLoaded(false);
            setError(true);
          }
        }}
        loading={lazy ? "lazy" : "eager"}
      />
    </div>
  );
};

// Demo component
export default function ImageDemo() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Image Component Demo</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lazy Loading (scroll down)</h2>
        <div className="h-[100vh] flex items-center justify-center bg-blue-50">
          <p className="text-gray-500">Scroll down to see lazy loading in action ↓</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">With Lazy Loading</h3>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
              className="h-64 rounded-lg overflow-hidden"
              alt="Mountain landscape"
              lazy={true}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Eager Loading</h3>
            <Image
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
              className="h-64 rounded-lg overflow-hidden"
              alt="Beach sunset"
              lazy={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}