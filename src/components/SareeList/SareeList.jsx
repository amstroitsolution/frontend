// frontend/src/components/SareeList/SareeList.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InquiryForm from "../InquiryForm/InquiryForm";

export default function SareeList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState(null);

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE}/api/equipment`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setErr(e.message || "Fetch error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="py-10 text-center text-gray-600">Loading sarees...</div>
    );

  if (err)
    return (
      <div className="py-10 text-center text-red-600">
        Error loading sarees: {err}
      </div>
    );

  if (!items || items.length === 0)
    return <div className="py-10 text-center text-gray-500">No sarees found.</div>;

  const sareeItems = items.filter((i) => i.type === "saree");
  const lehengaItems = items.filter((i) => i.type === "lehenga");

  const renderGrid = (list) => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((it, idx) => (
        <motion.div
          key={it._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
          className="group"
        >
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="relative overflow-hidden rounded-t-2xl">
              {it.images && it.images.length > 0 ? (
                <img
                  src={
                    it.images[0].startsWith("http")
                      ? it.images[0]
                      : `${API_BASE}${it.images[0]}`
                  }
                  alt={it.title}
                  className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📷</span>
                    </div>
                    <span className="text-sm font-medium">No Image</span>
                  </div>
                </div>
              )}

              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-800 to-amber-600 text-white text-xs font-semibold rounded-full capitalize shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {it.type === "saree" ? "Saree" : "Lehenga"}
                </span>
              </div>

              <button
                onClick={() => setSelected(it)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <span className="bg-white text-red-600 px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Quick View
                </span>
              </button>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-red-800 transition-colors duration-300">
                {it.title}
              </h3>
              <p
                className="text-gray-600 text-sm leading-relaxed mb-4 flex-1"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {it.description ||
                  (it.type === "saree"
                    ? "Beautiful designer saree with premium fabric."
                    : "Premium lehenga with exquisite design.")}
              </p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Starting from</p>
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-800 to-amber-600 bg-clip-text text-transparent">
                    ₹{it.price?.toLocaleString() || 0}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(it)}
                  className="bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-900 hover:to-amber-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {sareeItems.length > 0 && (
          <>
            <motion.div
              className="mb-16 md:mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 w-16 mx-auto mb-4"></div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">
                Shop Now
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mt-4 mb-4 leading-tight">
                Saree{" "}
                <span className="bg-gradient-to-r from-red-800 via-red-600 to-amber-500 bg-clip-text text-transparent font-black">
                  Collections
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Beautiful designer sarees with premium quality
              </p>
            </motion.div>
            {renderGrid(sareeItems)}
          </>
        )}

        {lehengaItems.length > 0 && (
          <div className="mt-20 md:mt-28">
            <motion.div
              className="mb-16 md:mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 w-16 mx-auto mb-4"></div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mt-4 mb-4 leading-tight">
                Lehenga{" "}
                <span className="bg-gradient-to-r from-red-800 via-red-600 to-amber-500 bg-clip-text text-transparent font-black">
                  Collections
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Beautiful lehengas with exquisite design and premium finishing
              </p>
            </motion.div>
            {renderGrid(lehengaItems)}
          </div>
        )}
      </div>

      {selected && (
        <DetailsModal item={selected} onClose={() => setSelected(null)} apiBase={API_BASE} />
      )}
    </section>
  );
}

function DetailsModal({ item, onClose, apiBase }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  
  if (!item) return null;

  const imageUrl =
    item.images && item.images.length > 0
      ? item.images[0].startsWith("http")
        ? item.images[0]
        : `${apiBase}${item.images[0]}`
      : null;

  const handleInquiry = () => {
    setIsInquiryOpen(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div
          className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
              ×
            </button>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
            {imageUrl ? (
              <img
                className="w-full h-[300px] md:h-[400px] object-contain rounded-xl bg-gray-50"
                src={imageUrl}
                alt={item.title}
              />
            ) : (
              <div className="w-full h-[300px] md:h-[400px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">{item.description || "No description available."}</p>
              <p className="text-lg font-semibold text-red-700">
                ₹{item.price?.toLocaleString() || 0}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleInquiry}
                  className="flex-1 bg-gradient-to-r from-red-800 to-amber-600 text-white py-2 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:from-red-900 hover:to-amber-700"
                >
                  Inquire Now
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:from-gray-700 hover:to-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      <InquiryForm
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={{
          _id: item._id,
          title: item.title,
          name: item.title,
          price: item.price,
          images: item.images,
          image: imageUrl,
          description: item.description,
          category: item.type,
          badge: item.type === 'saree' ? 'Saree' : 'Lehenga'
        }}
        productType="Saree"
      />
    </>
  );
}