import { useState, useEffect } from "react";

import ReelsViewer from "../ReelsViewer";

const reels = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
];

const Masonry = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-[90px] px-6">
        {[0, 1, 2, 3].map((col) => (
          <div className="grid gap-4" key={col}>
            {reels.slice(col * 3, col * 3 + 3).map((src, i) => {
              const idx = col * 3 + i;
              return (
                <div
                  key={src}
                  onClick={() => setActiveIndex(idx)}
                  className="cursor-pointer"
                >
                  <img className="rounded-lg" src={src} alt="" />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <ReelsViewer
          reels={reels}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
};

export default Masonry;
