import { useEffect, useRef, useState } from "react";

const ReelsViewer = ({ reels, activeIndex, onClose }) => {
  const containerRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(activeIndex || 0);

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (activeIndex) {
      document.body.classList.add("scroll", "hide");
    } else {
      document.body.classList.remove("scroll", "hide");
    }

    return () => {
      document.body.classList.remove("scroll", "hide");
    };
  }, [activeIndex]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleUp = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDown = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white text-2xl font-bold"
      >
        ✕
      </button>

      {/* Up & Down buttons */}
      <div className="absolute top-1/2 left-4 z-50 flex flex-col gap-4 -translate-y-1/2">
        <button
          onClick={handleUp}
          disabled={currentIndex === 0}
          className="bg-white hidden sm:inline text-black px-3 py-1 rounded disabled:opacity-50"
        >
          ↑
        </button>
        <button
          onClick={handleDown}
          disabled={currentIndex === reels.length - 1}
          className="bg-white hidden sm:inline text-black px-3 py-1 rounded disabled:opacity-50"
        >
          ↓
        </button>
      </div>

      <div
        ref={containerRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory hide"
      >
        {reels.map((src, index) => (
          <div
            key={index}
            className="h-screen w-screen snap-start flex items-center justify-center"
          >
            <img
              src={src}
              alt={`Reel ${index}`}
              className="max-h-full max-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsViewer;
