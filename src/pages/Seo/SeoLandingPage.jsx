import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ProductCard from "../../components/ProductCard/ProductCard";
import { seoConfig } from "./seoConfig";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function SeoLandingPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const data = seoConfig[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
        if (data) {
            fetchProducts();
        }
    }, [slug, data]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Build search URL with category filter if specified
            let searchUrl = `${API}/api/search?q=${encodeURIComponent(data.query)}&limit=12`;
            if (data.type && data.type !== 'both') {
                searchUrl += `&category=${data.type}`;
            }

            const res = await axios.get(searchUrl);
            let results = res.data.results || [];

            // Fallback: If no results found from search, fetch from active category products
            if (results.length === 0) {
                let fallbackUrl = `${API}/api/trending-items`; // Default to trending

                // If it's a specific category, use the dedicated active route for better relevance
                if (data.type === 'kids') {
                    fallbackUrl = `${API}/api/kids-products/active`;
                } else if (data.type === 'women') {
                    fallbackUrl = `${API}/api/women-products/active`;
                }

                const fallbackRes = await axios.get(fallbackUrl);
                const rawItems = Array.isArray(fallbackRes.data) ? fallbackRes.data : (fallbackRes.data.products || []);

                results = rawItems.slice(0, 12).map(p => ({
                    ...p,
                    type: data.type === 'kids' ? 'kids' : (data.type === 'women' ? 'women' : (p.productType === 'KidsProduct' ? 'kids' : 'women')),
                    productId: p._id
                }));
            }

            setProducts(results);
        } catch (err) {
            console.error("SEO Page fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!data) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold">Page Not Found</h2>
                <Link to="/" className="text-pink-600 mt-4 block">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="seo-landing-page min-h-screen bg-slate-50">
            <Helmet>
                <title>{data.title}</title>
                <meta name="description" content={data.description} />
                <meta name="keywords" content={data.keywords} />
                <link rel="canonical" href={`https://yashper.com/gurgaon/${slug}`} />
            </Helmet>

            {/* Hero Header */}
            <header className="bg-white border-b py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {data.h1}
                    </motion.h1>
                    <motion.p
                        className="text-lg text-slate-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {data.description}
                    </motion.p>
                </div>
            </header>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-slate-700">Recommended for You</h2>
                    <span className="text-sm text-slate-500">{products.length} Products Found</span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-xl h-64"></div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {products.map((product, idx) => (
                            <ProductCard
                                key={product._id || product.productId}
                                product={{
                                    ...product,
                                    _id: product._id || product.productId // Ensure _id is set for navigation
                                }}
                                productType={product.type === 'kids' ? 'KidsProduct' : 'WomenProduct'}
                                index={idx}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <p className="text-slate-500 mb-4">No specific products found for this category yet.</p>
                        <Link to="/search?q=latest" className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition">
                            Explore All Collection
                        </Link>
                    </div>
                )}

                {/* SEO Text Content */}
                <section className="mt-20 prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Why Choose Yashper in Gurgaon?</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
                        <div>
                            <p className="mb-4">
                                Yashper is dedicated to bringing premium quality fashion to the residents of Gurgaon.
                                Whether you are in DLF Phase 1 or MG Road, our collection of kids wear and women's ethnic
                                fashion is curated to meet the high standards of the millennium city.
                            </p>
                            <p>
                                Our <strong>{data.h1}</strong> collection features fabrics that are perfect for North India's
                                climate—breathable cottons for summer and royal velvets for winter weddings.
                            </p>
                        </div>
                        <div>
                            <p className="mb-4">
                                We understand that Gurgaon shoppers value both style and convenience. That's why we offer
                                exclusive designs that stand out in any social gathering, combined with reliable service
                                and high-quality finishes.
                            </p>
                            <ul className="list-disc pl-5 font-medium text-slate-700">
                                <li>Premium Fabrics (Mulmul, Organic Cotton, Silk)</li>
                                <li>Exclusive Handcrafted Designs</li>
                                <li>Hassle-free Online Shopping Experience</li>
                                <li>Curated Gurgaon-specific Trends</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            {/* Internal Linking for SEO */}
            <footer className="bg-slate-100 py-12 border-t">
                <div className="max-w-7xl mx-auto px-4">
                    <h3 className="text-lg font-bold text-slate-700 mb-6">Popular Searches in Gurgaon</h3>
                    <div className="flex flex-wrap gap-3">
                        {Object.keys(seoConfig).slice(0, 15).map(key => (
                            <Link
                                key={key}
                                to={`/gurgaon/${key}`}
                                className="bg-white px-4 py-2 rounded-full text-sm text-slate-600 border border-slate-200 hover:border-pink-300 hover:text-pink-600 transition"
                            >
                                {seoConfig[key].h1.split('|')[0]}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
