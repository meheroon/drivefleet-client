import { useEffect, useState } from "react";

export default function SmartScroll() {
  const [showButton, setShowButton] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowButton(scrollTop > 250);
      setIsNearBottom(scrollTop + windowHeight >= documentHeight - 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmartScroll = () => {
    if (isNearBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleSmartScroll}
      aria-label={isNearBottom ? "Scroll to top" : "Scroll to bottom"}
      title={isNearBottom ? "Scroll to top" : "Scroll to bottom"}
      className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 transition flex items-center justify-center text-2xl md:bottom-8 md:right-8"
    >
      {isNearBottom ? "↑" : "↓"}
    </button>
  );
}