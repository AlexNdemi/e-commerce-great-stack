import {type FC} from 'react';
import { type product } from '../../context/shop/ShopTypes';
import ProductItem from './ProductItem';

type MediaScrollerComponentProps = {
  collection:product[]
}
const MediaScrollerComponent:FC<MediaScrollerComponentProps> = ({collection}) => {
  // const mediaItems = [
  //   {
  //     id: 1,
  //     image: "https://images.unsplash.com/photo-1641353989082-9b15fa661805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODcyOA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Short title"
  //   },
  //   {
  //     id: 2,
  //     image: "https://images.unsplash.com/photo-1642190672487-22bde32965f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODcyOA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "A longer title here"
  //   },
  //   {
  //     id: 3,
  //     image: "https://images.unsplash.com/photo-1641841344411-49dbd02896f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODcyOA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "An even longer title on this one"
  //   },
  //   {
  //     id: 4,
  //     image: "https://images.unsplash.com/photo-1643223723262-7ce785730cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODcyOA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "A dog that's blinking?"
  //   },
  //   {
  //     id: 5,
  //     image: "https://images.unsplash.com/photo-1640938776314-4d303f8a1380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc2Mw&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Chair"
  //   },
  //   {
  //     id: 6,
  //     image: "https://images.unsplash.com/photo-1641259041823-e09935369105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc2Mw&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Ut enim ad minim veniam"
  //   },
  //   {
  //     id: 7,
  //     image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc2Mw&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Duis aute irure dolor"
  //   },
  //   {
  //     id: 8,
  //     image: "https://images.unsplash.com/photo-1641118961077-440391095cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc2Mw&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Cillum dolore eu"
  //   },
  //   {
  //     id: 9,
  //     image: "https://images.unsplash.com/photo-1640767014413-b7d27c58b058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc5NQ&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Scenic view"
  //   },
  //   {
  //     id: 10,
  //     image: "https://images.unsplash.com/photo-1640948612546-3b9e29c23e98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc5NQ&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Excepteur sint occaecat cupidatat non proident"
  //   },
  //   {
  //     id: 11,
  //     image: "https://images.unsplash.com/photo-1642484865851-111e68695d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc5NQ&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "At lectus urnaVestibulum"
  //   },
  //   {
  //     id: 12,
  //     image: "https://images.unsplash.com/photo-1642237778207-24985a0bf876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc5NQ&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Vestibulum"
  //   },
  //   {
  //     id: 13,
  //     image: "https://images.unsplash.com/photo-1642177584449-fa0b017dccc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODc5NQ&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Adipiscing tristique risus nec feugiat"
  //   },
  //   {
  //     id: 14,
  //     image: "https://images.unsplash.com/photo-1643249960396-d39d2a63ce8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODg0Mw&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Rutrum tellus pellentesque eu tincidunt"
  //   },
  //   {
  //     id: 15,
  //     image: "https://images.unsplash.com/photo-1641424222187-1c336d21804c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODg0OA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Bibendum enim"
  //   },
  //   {
  //     id: 16,
  //     image: "https://images.unsplash.com/photo-1640998483268-d1faffa789ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODkwNA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Amet commodo"
  //   },
  //   {
  //     id: 17,
  //     image: "https://images.unsplash.com/photo-1642034451735-2a8df1eaa2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODg4OQ&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "A erat nam at lectus"
  //   },
  //   {
  //     id: 18,
  //     image: "https://images.unsplash.com/photo-1640808238224-5520de93c939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODg4OQ&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Pellentesque eu tincidunt tortor aliquam nulla"
  //   },
  //   {
  //     id: 19,
  //     image: "https://images.unsplash.com/photo-1643039952431-38adfa91f320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODg0OA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Quam adipiscing vitae"
  //   },
  //   {
  //     id: 20,
  //     image: "https://images.unsplash.com/photo-1643148636637-58b3eb95cdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODg0OA&ixlib=rb-1.2.1&q=80&w=400",
  //     title: "Fermentum"
  //   }
  // ];

  return (
    <div className='py-0.5 mb-10'>
      {/* Header */}
      {/* <header className="py-16 mb-16 shadow-lg">
        {<div className="max-w-6xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-white mb-3">Horizontal scrolling</h1>
          <p className="text-xl text-white/90">Let's create a horizontal media scroller!</p>
        </div> }
      </header> */}

      <div className={`max-w-7xl mx-auto md:hidden`}>
        {/* Horizontal Scroller */}
        <div className="overflow-x-scroll snap-x snap-mandatory py-5 custom-scrollbar rounded-2xl">
          <div className="flex gap-4 min-w-min ">
            {collection.map((item) => (
              <div
                key={item._id}
                className="snap-start flex-shrink-0 w-[10%] min-w-[100px] max-w-[300px] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-[var(--surfaceElementLight)]"
              >
                <ProductItem
                  key={item._id}
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