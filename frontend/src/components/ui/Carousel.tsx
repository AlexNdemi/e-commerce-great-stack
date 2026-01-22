import  { useState, useRef } from 'react';
import  ChevronLeft from '../../components/ui/ChevronLeft';
import ChevronRight from '../../components/ui/ChevronRight';
import type { product } from '../../context/shop/ShopTypes';
import ProductItem from './ProductItem';


type CarouselProps={
  items:product[]

}

export const Carousel = ({items }:CarouselProps) => {
const   [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction:string) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.offsetWidth, scrollPosition + scrollAmount);

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollRef.current && 
    scrollPosition < scrollRef.current.scrollWidth - scrollRef.current.offsetWidth - 10;

  return (
    <div className="mb-12 bg-[var(--surfaceElementLight)] hidden md:block py-2 px-1">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
>
  {/* Left Arrow */}
  {canScrollLeft && (
    <button
      onClick={() => scroll('left')}
      className={`absolute left-0 top-1/2 rounded-[100vw] px-1 py-2 z-10 w-12 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-all transform -translate-y-1/2 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Scroll left"
    >
      <ChevronLeft className="size-8 text-white" />
    </button>
  )}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {
            items.map((item) => (
              <div className="min-w-[10px] md:max-w-[220px] flex-shrink-0">
                <ProductItem
                  key={item._id}
                  _id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}                    
                />
              </div>
              )
            )
          }
</div>

        {/* Right Arrow */}
      {canScrollRight && (
       <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 rounded-[100vw] px-1 py-2 z-10 w-12 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-all transform -translate-y-1/2 ${
        isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Scroll right"
    >
      <ChevronRight className="size-8 text-white" />
    </button>
  )}
      </div>
    </div>
  );
};