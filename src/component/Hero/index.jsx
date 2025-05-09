import { useContext } from "react";
import { Store } from "../../Context";
import Reels from "../Reels";
import HeroImageScroll from "../HeroImageScroll";
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=400",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=400",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=400",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=400",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=400",
];
const Hero = () => {
  const { isViewingStory } = useContext(Store);

  return (
    <div className="bg-white">
      <div
        className={`relative isolate ${
          isViewingStory ? "z-50" : ""
        }  mt-20 lg:px-8 `}
      >
        <Reels />
        <HeroImageScroll images={images} />
      </div>
    </div>
  );
};

export default Hero;
