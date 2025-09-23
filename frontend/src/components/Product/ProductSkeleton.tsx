import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "../../hooks/useTheme";

export const ProductSkeleton = () => {
  const { theme } = useTheme();
  
  const baseColor = theme === "dark" ? "#202020" : "#ebebeb"; 
  const highlightColor = theme === "dark" ? "#444" : "#f5f5f5"; 

  return (
    <div className="border-t-2 pt-10 border-gray-300 dark:border-t-[rgba(255,255,255,0.2)]">
      {/* ----- Product Data -----*/}
      <div className="flex gap-12 flex-col lg:flex-row">
        {/* ----- Product Images -----*/}
        <div className="flex-1 flex flex-col lg:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-start lg:w-fit gap-2 order-1 lg:order-0 w-full">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                height={100}
                width={50}
                baseColor={baseColor}
                highlightColor={highlightColor}
                className="rounded-md"
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full lg:w-4/5">
            <Skeleton
              height={500}
              baseColor={baseColor}
              highlightColor={highlightColor}
              className="w-full"
            />
          </div>
        </div>
        {/* ----- Product Info ----- */}
        <div className="flex-1">
          {/* Title */}
          <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} height={30} width="70%" className="mt-2" />

          {/* Stars */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton 
                baseColor={baseColor}
                highlightColor={highlightColor} key={i} 
                width={16} 
                height={16} 
                circle />
            ))}
            <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} width={40} height={16} className="pl-2" />
          </div>

          {/* Price */}
          <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} height={36} width="30%" className="mt-5" />

          {/* Description */}
          <div className="mt-5 space-y-2 md:max-w-4/5">
            <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} height={20} />
            <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} height={20} />
            <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} height={20} width="80%" />
          </div>

          {/* Sizes + Button */}
          <div className="flex flex-col gap-4 my-8">
            <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} height={20} width="30%" />

            <div className="flex gap-2 flex-wrap">
              {[...Array(4)].map((_, i) => (
                <Skeleton 
                  baseColor={baseColor}
                  highlightColor={highlightColor} key={i} height={40} 
                  width={60} />
              ))}
            </div>

            <Skeleton 
              baseColor={baseColor}
              highlightColor={highlightColor} height={48} width={200} />

            <hr className="bg-gray-300 dark:bg-[rgba(255,255,255,0.2)] border-0 h-[1px]" />

            <div className="text-sm mt-5 flex flex-col gap-1">
              <Skeleton 
                baseColor={baseColor}
                highlightColor={highlightColor} height={16} 
                width="80%" />
              <Skeleton 
                baseColor={baseColor}
                highlightColor={highlightColor} height={16} width="70%" />
              <Skeleton 
                baseColor={baseColor}
                highlightColor={highlightColor} height={16} 
                width="90%" />
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
};
