import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import InquiryForm from "../InquiryForm/InquiryForm";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const WatchBuySection = () => {
  const scrollRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

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
    },
    {
      _id: "4",
      title: "Pastel Lehenga",
      price: 14499,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_d375331c-7185-4c5b-b7f1-59239694e8cc.mp4?v=1761739255",
      mediaType: "video",
      published: true
    },
    {
      _id: "5",
      title: "Modern Fusion Saree",
      price: 12999,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_f8380c08-d066-45a0-9ea7-4b38ea4622f2.mp4?v=1744375273",
      mediaType: "video",
      published: true
    },
    {
      _id: "6",
      title: "Classic Bridal Set",
      price: 24999,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_cdc5c184-07ec-48ec-afc3-90a8f6f90869.mp4?v=1747309325",
      mediaType: "video",
      published: true
    },
    {
      _id: "7",
      title: "Charming Pink Dress",
      price: 10499,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_bc3e67ed-9538-4fbf-b000-bc3aa6afea40.mp4?v=1747305740",
      mediaType: "video",
      published: true
    },
    {
      _id: "8",
      title: "Designer Saree Glam",
      price: 18999,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_5d4b0828-159a-4bde-88f0-55882b0fe4ed.mp4?v=1744376215",
      mediaType: "video",
      published: true
    },
    {
      _id: "9",
      title: "Royal Red Gown",
      price: 21999,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_5d4b0828-159a-4bde-88f0-55882b0fe4ed.mp4?v=1744376215",
      mediaType: "video",
      published: true
    },
    {
      _id: "10",
      title: "Golden Embroidery Set",
      price: 17499,
      mediaUrl: "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/whatmore_tn_15f9f056-a0a4-4534-b2b8-c056341c8bd6.mp4?v=1741762861",
      mediaType: "video",
      published: true
    },
  ];

  // Fetch Watch & Buy items from API
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

  // Auto-scroll
  useEffect(() => {
    if (isManualScroll) return; // stop auto scroll if manual

    const scrollContainer = scrollRef.current;
    let scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 2, behavior: "smooth" });
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, [isManualScroll]);

  const scrollLeft = () => {
    setIsManualScroll(true);
    scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    setIsManualScroll(true);
    scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  const handleInquiry = (item) => {
    setSelectedProduct(item);
    setIsInquiryOpen(true);
  };

  return (
    <section className="relative w-full bg-[#faf9f8] py-12 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        ✨ Watch & Buy Collection ✨
      </h2>

      {/* Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-10 transition"
      >
        <FaChevronLeft className="text-gray-800 text-xl" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-10 transition"
      >
        <FaChevronRight className="text-gray-800 text-xl" />
      </button>

      {/* Scroll container */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading collection...</div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-8 no-scrollbar"
        >
          {items.map((item) => {
            const mediaUrl = item.mediaUrl?.startsWith('http') 
              ? item.mediaUrl 
              : item.mediaUrl 
                ? `${API}${item.mediaUrl}` 
                : '';
            
            return (
              <div
                key={item._id}
                onMouseEnter={() => setHovered(item._id)}
                onMouseLeave={() => setHovered(null)}
                className={`min-w-[250px] md:min-w-[280px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 relative cursor-pointer group ${
                  hovered === item._id ? "scale-105 z-20" : ""
                }`}
              >
                {item.mediaType === 'video' ? (
                  <video
                    src={mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-[360px] object-cover"
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt={item.title}
                    className="w-full h-[360px] object-cover"
                  />
                )}
                
                {/* Inquiry Button Overlay */}
                <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
                  hovered === item._id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquiry(item);
                    }}
                    style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
                    className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 hover:opacity-90"
                  >
                    <FaEnvelope size={16} />
                    <span>Inquire Now</span>
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs opacity-90">₹{item.price?.toLocaleString('en-IN')}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInquiry(item);
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 flex items-center space-x-1"
                    >
                      <FaEnvelope size={10} />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Inquiry Form Modal */}
      {selectedProduct && (
        <InquiryForm
          isOpen={isInquiryOpen}
          onClose={() => {
            setIsInquiryOpen(false);
            setSelectedProduct(null);
          }}
          product={{
            _id: selectedProduct._id,
            title: selectedProduct.title,
            name: selectedProduct.title,
            price: selectedProduct.price,
            images: selectedProduct.mediaUrl ? [selectedProduct.mediaUrl] : [],
            image: selectedProduct.mediaUrl,
            description: `Watch & Buy Collection - ${selectedProduct.title}`,
            category: 'Watch & Buy',
            badge: 'FEATURED'
          }}
          productType="WatchBuy"
        />
      )}
    </section>
  );
};

export default WatchBuySection;
