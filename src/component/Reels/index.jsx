import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { IoPlayOutline } from "react-icons/io5";
import { CiPause1 } from "react-icons/ci";
import { useContext } from "react";
import { Store } from "../../Context";
// Sample data for stories
const storyData = [
  {
    id: 1,
    username: "Fashion Hub",
    userImage: "https://picsum.photos/seed/fashionhub/100",
    stories: [
      {
        id: 101,
        type: "image",
        url: "https://picsum.photos/seed/fashion1/600/800",
        duration: 5000,
        caption: "🔥 Flash Sale! 50% Off on trending fashion.",
        timestamp: "1h ago",
        ctaText: "Shop Now",
        ctaLink: "#",
      },
      {
        id: 102,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: 10000,
        caption: "🎥 Behind the scenes of our latest shoot!",
        timestamp: "50m ago",
        ctaText: "Watch More",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 2,
    username: "Tech Store",
    userImage: "https://picsum.photos/seed/techstore/100",
    stories: [
      {
        id: 103,
        type: "image",
        url: "https://picsum.photos/seed/tech1/600/800",
        duration: 5000,
        caption: "🚀 Meet the latest gadgets.",
        timestamp: "2h ago",
        ctaText: "Buy Now",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 3,
    username: "Beauty Bliss",
    userImage: "https://picsum.photos/seed/beautybliss/100",
    stories: [
      {
        id: 104,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: 10000,
        caption: "💄 5-minute glam tutorial!",
        timestamp: "3h ago",
        ctaText: "Try Now",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 4,
    username: "Gadget Zone",
    userImage: "https://picsum.photos/seed/gadgetzone/100",
    stories: [
      {
        id: 105,
        type: "image",
        url: "https://picsum.photos/seed/gadget1/600/800",
        duration: 5000,
        caption: "🎧 Immersive sound experience.",
        timestamp: "4h ago",
        ctaText: "Grab Now",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 5,
    username: "Kitchen Pro",
    userImage: "https://picsum.photos/seed/kitchenpro/100",
    stories: [
      {
        id: 106,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: 10000,
        caption: "👨‍🍳 Cookware in action!",
        timestamp: "5h ago",
        ctaText: "Explore More",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 6,
    username: "Fitness Freaks",
    userImage: "https://picsum.photos/seed/fitness/100",
    stories: [
      {
        id: 107,
        type: "image",
        url: "https://picsum.photos/seed/fitnessgear/600/800",
        duration: 5000,
        caption: "🏋️ Power up your workouts.",
        timestamp: "6h ago",
        ctaText: "Shop Fitness",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 7,
    username: "Travel Tales",
    userImage: "https://picsum.photos/seed/traveltales/100",
    stories: [
      {
        id: 108,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: 10000,
        caption: "🌍 Discover paradise.",
        timestamp: "7h ago",
        ctaText: "Book Now",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 8,
    username: "Sneaker Spot",
    userImage: "https://picsum.photos/seed/sneakerspot/100",
    stories: [
      {
        id: 109,
        type: "image",
        url: "https://picsum.photos/seed/sneaker1/600/800",
        duration: 5000,
        caption: "👟 Sneaker drop of the week.",
        timestamp: "8h ago",
        ctaText: "Shop Now",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 9,
    username: "Home Decor",
    userImage: "https://picsum.photos/seed/homedecor/100",
    stories: [
      {
        id: 110,
        type: "image",
        url: "https://picsum.photos/seed/decor1/600/800",
        duration: 5000,
        caption: "🏠 Make your space cozy.",
        timestamp: "9h ago",
        ctaText: "View Ideas",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 10,
    username: "AutoWorld",
    userImage: "https://picsum.photos/seed/autoworld/100",
    stories: [
      {
        id: 111,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: 10000,
        caption: "🚗 Test drive in 60s.",
        timestamp: "10h ago",
        ctaText: "View Cars",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 11,
    username: "Music Lounge",
    userImage: "https://picsum.photos/seed/musiclounge/100",
    stories: [
      {
        id: 112,
        type: "image",
        url: "https://picsum.photos/seed/music1/600/800",
        duration: 5000,
        caption: "🎶 Find your sound.",
        timestamp: "11h ago",
        ctaText: "Listen Now",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 12,
    username: "Toy Town",
    userImage: "https://picsum.photos/seed/toytown/100",
    stories: [
      {
        id: 113,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: 10000,
        caption: "🧸 Fun starts here!",
        timestamp: "12h ago",
        ctaText: "Shop Toys",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 13,
    username: "Book Nest",
    userImage: "https://picsum.photos/seed/booknest/100",
    stories: [
      {
        id: 114,
        type: "image",
        url: "https://picsum.photos/seed/book1/600/800",
        duration: 5000,
        caption: "📚 Discover a new story.",
        timestamp: "13h ago",
        ctaText: "Browse Books",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 14,
    username: "Pet Paradise",
    userImage: "https://picsum.photos/seed/petparadise/100",
    stories: [
      {
        id: 115,
        type: "image",
        url: "https://picsum.photos/seed/pet1/600/800",
        duration: 5000,
        caption: "🐾 Treats your pet deserves.",
        timestamp: "14h ago",
        ctaText: "Explore",
        ctaLink: "#",
      },
    ],
  },
  {
    id: 15,
    username: "Eco Living",
    userImage: "https://picsum.photos/seed/ecoliving/100",
    stories: [
      {
        id: 116,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: 10000,
        caption: "🌱 Sustainability in motion.",
        timestamp: "15h ago",
        ctaText: "Go Green",
        ctaLink: "#",
      },
    ],
  },
];

const Reels = () => {
  const { isViewingStory, setIsViewingStory } = useContext(Store);

  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // const [isViewingStory, setIsViewingStory] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleUsers, setVisibleUsers] = useState({ start: 0, end: 4 });

  const progressIntervalRef = useRef(null);
  const storyTimeoutRef = useRef(null);
  const scrollRef = useRef(null);

  const activeUser = storyData[activeUserIndex];
  const activeStory = activeUser?.stories[activeStoryIndex];
  const explore = (e) => {
    e.stopPropagation();
    setIsOpen(true);
    document.body.classList.add("scroll");
  };
  // Handle story progression
  useEffect(() => {
    if (!isViewingStory || isPaused) return;

    // Clear any existing intervals/timeouts
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (storyTimeoutRef.current) clearTimeout(storyTimeoutRef.current);

    setProgress(0);

    const duration = activeStory?.duration || 5000;
    const intervalStep = 100 / (duration / 100); // Update progress every 100ms

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current);
          return 100;
        }
        return prev + intervalStep;
      });
    }, 100);

    storyTimeoutRef.current = setTimeout(() => {
      goToNextStory();
    }, duration);

    return () => {
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
      if (storyTimeoutRef.current) clearTimeout(storyTimeoutRef.current);
    };
  }, [activeUserIndex, activeStoryIndex, isViewingStory, isPaused]);

  const openStory = (userIndex) => {
    setActiveUserIndex(userIndex);
    document.body.classList.add("scroll");
    setActiveStoryIndex(0);
    setIsViewingStory(true);
    setProgress(0);
  };

  const closeStory = () => {
    setIsViewingStory(false);
    document.body.classList.remove("scroll");
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (storyTimeoutRef.current) clearTimeout(storyTimeoutRef.current);
  };

  const goToPreviousStory = () => {
    if (activeStoryIndex > 0) {
      // Go to previous story of the same user
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    } else if (activeUserIndex > 0) {
      // Go to the last story of the previous user
      const previousUserIndex = activeUserIndex - 1;
      const previousUser = storyData[previousUserIndex];
      setActiveUserIndex(previousUserIndex);
      setActiveStoryIndex(previousUser.stories.length - 1);
      setProgress(0);
    }
  };

  const goToNextStory = () => {
    if (activeStoryIndex < activeUser.stories.length - 1) {
      // Go to next story of the same user
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else if (activeUserIndex < storyData.length - 1) {
      // Go to the first story of the next user
      setActiveUserIndex(activeUserIndex + 1);
      setActiveStoryIndex(0);
      setProgress(0);
    } else {
      // End of all stories
      closeStory();
    }
  };

  const handleStoryClick = (e) => {
    const { clientX } = e;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickPosition = clientX - left;

    // If clicked on the left third, go to previous story
    if (clickPosition < width / 3) {
      goToPreviousStory();
    }
    // If clicked on the right third, go to next story
    else if (clickPosition > (width * 2) / 3) {
      goToNextStory();
    }
  };

  const scrollUsers = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -120 : 120, // Adjust scrolling distance
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-[800px] mx-auto my-0 relative">
      {/* Story Avatars Row */}
      <div className="relative  py-0">
        <div className="absolute left-0  group top-0 z-10 w-[24px] h-full bg-[#ffffff99] blur-sm sm:blur-none border-none flex  justify-center items-center">
          <button
            onClick={() => scrollUsers("left")}
            className="z-10 w-[24px] h-[24px] hidden rounded-md sm:flex bg-transparent border-none align-middle  justify-center cursor-pointer "
          >
            <FaChevronLeft className="group-hover:visible invisible" />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            gap: "16px",
            whiteSpace: "nowrap",
            padding: "0 24px",
            scrollbarWidth: "none", // Hide scrollbar for Firefox
            msOverflowStyle: "none",
          }}
          ref={scrollRef}
        >
          {storyData?.map((user, index) => {
            const actualIndex = index + visibleUsers.start;
            return (
              <div
                key={user.id}
                // onClick={() => openStory(actualIndex)}
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    padding: "3px",
                    background:
                      "linear-gradient(45deg,rgb(0, 0, 255), #6254f3,rgb(39, 133, 220),rgb(35, 162, 204),rgb(24, 68, 188))",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "2px solid white",
                      overflow: "hidden",
                    }}
                    onClick={() => openStory(actualIndex)}
                  >
                    <img
                      src={user.userImage || "/placeholder.svg"}
                      alt={user.username}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    maxWidth: "70px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {user.username}
                </span>
              </div>
            );
          })}
        </div>

        <div className="absolute right-0 group  top-0 z-10 w-[24px] h-full bg-[#ffffff99] blur-sm sm:blur-none border-none flex  justify-center items-center">
          <button
            onClick={() => scrollUsers("right")}
            className="z-10 w-[24px] h-[24px] hidden rounded-md sm:flex bg-transparent border-none align-middle  justify-center cursor-pointer "
          >
            <FaChevronRight className="group-hover:visible invisible" />
          </button>
        </div>
      </div>

      {/* Story Viewer */}
      {isViewingStory && (
        <div
          className="z-50 "
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",

            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Progress bars */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              padding: "12px",
              zIndex: 1010,
            }}
          >
            {activeUser.stories.map((story, index) => (
              <div
                key={story.id}
                style={{
                  height: "2px",
                  flex: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width:
                      index < activeStoryIndex
                        ? "100%"
                        : index === activeStoryIndex
                        ? `${progress}%`
                        : "0%",
                    transition:
                      index === activeStoryIndex && !isPaused
                        ? "width 0.1s linear"
                        : "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              zIndex: 1010,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "12px",
                }}
              >
                <img
                  src={activeUser.userImage || "/placeholder.svg"}
                  alt={activeUser.username}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {activeUser.username}
                </div>
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "12px",
                  }}
                >
                  {activeStory.timestamp}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={() => setIsPaused(!isPaused)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                {isPaused ? <IoPlayOutline /> : <CiPause1 />}
              </button>
              <button
                onClick={closeStory}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <IoCloseOutline />
              </button>
            </div>
          </div>

          {/* Story Content */}
          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onClick={handleStoryClick}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {activeStory.type === "image" ? (
              <img
                src={activeStory.url || "/placeholder.svg"}
                alt=""
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <video
                src={activeStory.url}
                controls
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}

            {/* Caption */}
            {activeStory.caption && (
              <div
                style={{
                  position: "absolute",
                  bottom: "80px",
                  left: "16px",
                  right: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {activeStory.caption}
              </div>
            )}

            {/* Navigation Hints (invisible but clickable) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "33%",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousStory();
              }}
            />

            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "33%",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToNextStory();
              }}
            />
          </div>

          {/* Story Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              zIndex: 1010,
            }}
          >
            <input
              type="text"
              placeholder="Send message"
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "24px",
                color: "white",
                padding: "12px 16px",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: "16px", marginLeft: "16px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <GoHeart />
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <BsSend />
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <CiBookmark size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reels;
