import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroImageScroll = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden mt-5">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-[600px]"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              // backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute  rounded-full left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-2"
        onClick={() =>
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
      >
        <FaChevronLeft className=" " />
      </button>
      <button
        className="absolute  rounded-full right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-2"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
      >
        <FaChevronRight className="" />
      </button>
    </div>
  );
};

export default HeroImageScroll;
