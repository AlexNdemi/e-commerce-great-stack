import {type FC} from 'react';
import { type product } from '../../context/shop/ShopTypes';
import ProductItem from './ProductItem';

type MediaScrollerComponentProps = {
  collection:product[]
}
const MediaScrollerComponent:FC<MediaScrollerComponentProps> = ({collection}) => {
  

  return (
    <div className='py-0.5 mb-10'>
      <div className={`max-w-7xl mx-auto md:hidden`}>
        {/* Horizontal Scroller */}
        <div className="overflow-x-scroll snap-x snap-mandatory py-5 custom-scrollbar rounded-2xl">
          <div className="flex gap-4 min-w-min ">
            {collection.map((item,index) => (
              <div
                key={item._id}
                className="snap-start flex-shrink-0 w-[10%] min-w-[120px] max-w-[300px] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-[var(--surfaceElementLight)]"
              >
                <ProductItem
                  key={index}
                  _id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2em;
          height: 2em;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(180, 6%, 70%);
          border-radius: 100vw;
          margin-block: 0.5em;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(180 6% 20%);
          border: 0.25em solid hsl(180 6 50%);
          border-radius: 100vw;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(180 6% 20%);
        }
        @supports (scrollbar-color: hsl(180 6% 10%) hsl(180 6% 30%)) {
          .custom-scrollbar {
            scrollbar-color: hsl(180 6% 50%) hsl(180 6% 70%);
          }
        }
      `}</style>
    </div>
  );
};;


export default MediaScrollerComponent;