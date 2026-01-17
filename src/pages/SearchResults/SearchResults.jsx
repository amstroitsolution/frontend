import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "women";

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

  useEffect(() => {
    if (query.trim().length >= 2) {
      performSearch();
    } else {
      setIsLoading(false);
    }
  }, [query, category]);

  const performSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API}/api/search?q=${encodeURIComponent(query)}&category=${category}&limit=50`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to load search results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (result) => {
    navigate(result.url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-pink-500 text-4xl animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {query ? (
              <>
                Showing results for <span className="font-semibold text-pink-600">"{query}"</span> in{" "}
                <span className="font-semibold">{category}</span> category
              </>
            ) : (
              "Enter a search query to find products"
            )}
          </p>
          {results.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Found {results.length} product{results.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FaSearch className="text-gray-300 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No results found
            </h2>
            <p className="text-gray-500 mb-6">
              We couldn't find any products matching "{query}"
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
            >
              Go Back
            </button>
          </motion.div>
        )}

        {/* Results Grid */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <ProductCard
                key={result._id}
                product={{
                  ...result,
                  name: result.title,
                }}
                productType={result.type === 'kids' ? 'KidsProduct' : 'WomenProduct'}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
