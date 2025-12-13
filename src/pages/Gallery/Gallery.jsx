// frontend/src/pages/SareeCollection.jsx
import React, { useEffect, useState, useRef } from "react";

export default function SareeCollection() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fetch Saree galleries
  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/api/gallery`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load galleries");
        return res.json();
      })
      .then((data) => mounted && setGalleries(data || []))
      .catch((err) => mounted && setError(err.message || "Load error"))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [API_BASE]);

  const openGallery = (gallery, index = 0) => {
    setSelected(gallery);
    setImgIndex(index);
    setAutoPlay(true);
  };

  const closeGallery = () => {
    setSelected(null);
    setImgIndex(0);
    setAutoPlay(false);
    clearInterval(autoRef.current);
  };

  const prevImg = () => {
    if (!selected?.images) return;
    setImgIndex((i) => (i - 1 + selected.images.length) % selected.images.length);
    setAutoPlay(false);
  };

  const nextImg = () => {
    if (!selected?.images) return;
    setImgIndex((i) => (i + 1) % selected.images.length);
    setAutoPlay(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") return closeGallery();
      if (e.key === "ArrowLeft") return prevImg();
      if (e.key === "ArrowRight") return nextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Autoplay effect
  useEffect(() => {
    if (!selected || !autoPlay) return clearInterval(autoRef.current);
    if (!selected.images || selected.images.length < 2) return;

    autoRef.current = setInterval(() => {
      setImgIndex((i) => (i + 1) % selected.images.length);
    }, 3000);

    return () => clearInterval(autoRef.current);
  }, [selected, autoPlay]);

  if (loading)
    return <div className="flex justify-center items-center min-h-[60vh] text-gray-600">Loading Saree collection...</div>;
  if (error)
    return <div className="flex justify-center items-center min-h-[60vh] text-red-600">{error}</div>;

  return (
    <section className="min-h-screen bg-pink-50 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="h-64 md:h-80 lg:h-96 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}>
          <div className="relative z-20 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">Saree Collection</h1>
            <p className="mt-2 text-white/90 max-w-2xl mx-auto">Explore our exclusive Saree collections. Click on any card to view details.</p>
            <div className="mt-6 flex justify-center">
              <button onClick={() => window.scrollTo({ top: 450, behavior: "smooth" })} className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-md hover:bg-white/20 transition">View Sarees</button>
            </div>
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute -left-20 -top-10 w-72 h-72 rounded-full bg-pink-400 opacity-30 blur-3xl animate-float-slow" style={{ mixBlendMode: 'screen' }} />
          <div className="absolute right-10 -top-16 w-56 h-56 rounded-full bg-purple-400 opacity-25 blur-2xl animate-float-slower" style={{ mixBlendMode: 'screen' }} />
          <div className="absolute left-1/2 top-10 w-40 h-40 rounded-full bg-pink-300 opacity-20 blur-xl animate-float" style={{ transform: 'translateX(-50%)', mixBlendMode: 'screen' }} />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {galleries.length === 0 ? (
          <div className="text-center text-gray-500">No Sarees found.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((g) => (
              <article key={g._id} onClick={() => openGallery(g)} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer">
                <div className="relative w-full h-64">
                  {g.coverImage || (g.images && g.images[0]) ? (
                    <img
                      src={(g.coverImage || g.images[0]).startsWith("http") ? (g.coverImage || g.images[0]) : `${API_BASE}${g.coverImage || g.images[0]}`}
                      alt={g.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                  )}
                  <div className="absolute left-4 bottom-4 bg-black/50 backdrop-blur rounded-md px-3 py-1 text-white text-sm">
                    { (g.images || []).length } photos
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{g.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{g.description || "No description available"}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Slider */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4" onClick={closeGallery}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-white mb-3">
              <div>
                <h2 className="text-xl font-semibold">{selected.title}</h2>
                <p className="text-sm text-white/80">{selected.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-white/90 flex items-center gap-2">
                  <input type="checkbox" checked={autoPlay} onChange={(e) => setAutoPlay(e.target.checked)} /> Auto-play
                </label>
                <button onClick={closeGallery} className="p-2 rounded bg-white/10 hover:bg-white/20">✕</button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
                {selected.images && selected.images.length > 0 ? (
                  <img
                    key={selected.images[imgIndex]}
                    src={selected.images[imgIndex].startsWith("http") ? selected.images[imgIndex] : `${API_BASE}${selected.images[imgIndex]}`}
                    alt={`slide-${imgIndex}`}
                    loading="lazy"
                    className="max-h-[70vh] object-contain mx-auto transition-opacity duration-500 ease-out opacity-100"
                    style={{ animation: "fadeIn .35s" }}
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">No images</div>
                )}

                {selected.images && selected.images.length > 1 && (
                  <>
                    <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white z-10">◀</button>
                    <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white z-10">▶</button>
                  </>
                )}
              </div>

              {selected.images && selected.images.length > 0 && (
                <div className="p-3 bg-gray-50 flex gap-2 overflow-x-auto">
                  {selected.images.map((img, idx) => (
                    <button key={idx} onClick={() => { setImgIndex(idx); setAutoPlay(false); }} className={`w-20 h-16 rounded overflow-hidden flex-shrink-0 border ${idx === imgIndex ? "ring-2 ring-pink-500" : "border-gray-200"}`}>
                      <img loading="lazy" src={img.startsWith("http") ? img : `${API_BASE}${img}`} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-3 flex items-center justify-between bg-white border-t">
                <div className="text-sm text-gray-600">Image {imgIndex + 1} of {selected.images?.length || 0}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setImgIndex(0); setAutoPlay(false); }} className="px-3 py-1 text-sm bg-gray-100 rounded">First</button>
                  <a href={selected.images?.[imgIndex] ? (selected.images[imgIndex].startsWith("http") ? selected.images[imgIndex] : `${API_BASE}${selected.images[imgIndex]}`) : "#"} target="_blank" rel="noreferrer" className="px-3 py-1 text-sm bg-pink-600 text-white rounded">Open Original</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Animations */}
      <style>{`
        @keyframes float {0% {transform:translateY(0) translateX(0);}50% {transform:translateY(-18px) translateX(8px);}100% {transform:translateY(0) translateX(0);}}
        @keyframes float-slow {0% {transform:translateY(0) translateX(0);}50% {transform:translateY(-28px) translateX(-6px);}100% {transform:translateY(0) translateX(0);}}
        @keyframes float-slower {0% {transform:translateY(0) translateX(0);}50% {transform:translateY(-16px) translateX(10px);}100% {transform:translateY(0) translateX(0);}}
        .animate-float {animation:float 6s ease-in-out infinite;}
        .animate-float-slow {animation:float-slow 9s ease-in-out infinite;}
        .animate-float-slower {animation:float-slower 12s ease-in-out infinite;}
        @keyframes fadeIn {from {opacity:0} to {opacity:1}}
      `}</style>
    </section>
  );
}
