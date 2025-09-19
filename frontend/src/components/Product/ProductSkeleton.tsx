import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "../../hooks/useTheme";

export const ProductSkeleton = () => {
  const { theme } = useTheme();
  
  // Define colors for both light and dark themes
  const baseColor = theme === "dark" ? "#202020" : "#ebebeb"; // Light gray for light mode
  const highlightColor = theme === "dark" ? "#444" : "#f5f5f5"; // Lighter gray for light mode highlight

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
                height={130}
                width={100}
                baseColor={baseColor}
                highlightColor={highlightColor}
                className="flex-shrink-0 rounded-md"
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
            {/* ----- Product Info ----- */}
          <div className="flex-1">
            {/* Title */}
            <Skeleton 
              height={30}
              baseColor={baseColor}
              highlightColor={highlightColor} 
              width="70%"  
              className="mt-2" />

            {/* Stars */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} 
                width={16} 
                height={16} 
                circle 
                baseColor={baseColor}
                highlightColor={highlightColor}/>
              ))}
              <Skeleton 
                width={40} 
                height={16} 
                className="pl-2" 
                baseColor={baseColor}
                highlightColor={highlightColor}/>
            </div>

            {/* Price */}
            <Skeleton 
              height={36} 
              width="30%" 
              className="mt-5"
              baseColor={baseColor}
              highlightColor={highlightColor} />

            {/* Description */}
            <div className="mt-5 space-y-2 md:max-w-4/5">
              <Skeleton 
                height={20} 
                baseColor={baseColor}
                highlightColor={highlightColor}/>
              <Skeleton 
                height={20} 
                baseColor={baseColor}
                highlightColor={highlightColor}/>
              <Skeleton 
                height={20} 
                width="80%" 
                baseColor={baseColor}
                highlightColor={highlightColor}/>
            </div>

            {/* Sizes + Button */}
            <div className="flex flex-col gap-4 my-8">
              <Skeleton 
                height={20} 
                width="30%" 
                baseColor={baseColor}
                highlightColor={highlightColor}/>

              <div className="flex gap-2 flex-wrap">
                {[...Array(3)].map((_, i) => (
                  <Skeleton 
                    key={i} 
                    height={40} 
                    width={60}
                    baseColor={baseColor}
                    highlightColor={highlightColor}/>
                ))}
              </div>

              <Skeleton 
                height={48} 
                width={200}
                baseColor={baseColor}
                highlightColor={highlightColor} />

              <hr className="bg-gray-300 dark:bg-[rgba(255,255,255,0.2)] border-0 h-[1px]" />

              <div className="text-sm mt-5 flex flex-col gap-1">
                <Skeleton 
                  height={16} 
                  width="80%" 
                  baseColor={baseColor}
                  highlightColor={highlightColor}/>
                <Skeleton 
                  height={16} 
                  width="70%" 
                  baseColor={baseColor}
                  highlightColor={highlightColor}/>
                <Skeleton 
                  height={16} 
                  width="90%" 
                  baseColor={baseColor}
                  highlightColor={highlightColor}/>
              </div>
            </div>
          </div>
        </div> *   
      </div>
    </div>
  );
};
