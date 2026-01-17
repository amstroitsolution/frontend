import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

const WatchBuySection = () => {
  const scrollRef = useRef(null);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback videos
  const fallbackVideos = [
    {
      _id: "1",
      title: "Elegant Red Saree",
      price: 19999,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_52d2b03e-ef59-412c-94c6-903513073bdf.mp4?v=1762520837",
      mediaType: "video",
      published: true
    },
    {
      _id: "2",
      title: "Bridal Glow Look",
      price: 22499,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_0ce35c0a-c85f-41d6-bbe5-e8d1d6bcf785.mp4?v=1762520950",
      mediaType: "video",
      published: true
    },
    {
      _id: "3",
      title: "Festive Anarkali",
      price: 16999,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_59b4fe1d-4ee4-4cca-82d7-3b55b9818f8f.mp4?v=1762521039",
      mediaType: "video",
      published: true
    }
  ];

  useEffect(() => {
    const fetchWatchBuyItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/watchbuy`);
        const data = Array.isArray(res.data) ? res.data : res.data.items || [];
        const publishedItems = data.filter(item => item.published);

        if (publishedItems.length > 0) {
          setItems(publishedItems);
        } else {
          setItems(fallbackVideos);
        }
      } catch (err) {
        console.error("WatchBuy fetch error, using fallback data:", err);
        setItems(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchBuyItems();
  }, []);

  useEffect(() => {
    if (isManualScroll) return;

    const scrollContainer = scrollRef.current;
    let scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 1, behavior: "auto" });
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth - 10
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 40);

    return () => clearInterval(scrollInterval);
  }, [isManualScroll]);

  const scrollLeft = () => {
    setIsManualScroll(true);
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    setIsManualScroll(true);
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#faf9f8] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
        <div>
          <span className="text-pink-600 font-bold uppercase tracking-widest text-sm mb-2 block">Immersive Shopping</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Watch & Buy Collection ✨
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={scrollLeft}
            className="bg-white border-2 border-pink-100 p-4 rounded-full shadow-lg hover:border-pink-500 hover:text-pink-600 transition-all"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white border-2 border-pink-100 p-4 rounded-full shadow-lg hover:border-pink-500 hover:text-pink-600 transition-all"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth px-8 pb-10 no-scrollbar"
        >
          {items.map((item, idx) => (
            <div key={item._id} className="min-w-[320px]">
              <ProductCard
                product={item}
                productType="WatchBuy"
                index={idx}
                badgeText="VIDEO"
              />
            </div>
          ))}
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default WatchBuySection;
