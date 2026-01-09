import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaTimes, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

  // Determine current category based on route
  const currentCategory = location.pathname.startsWith('/kids') ? 'kids' : 'women';

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on route change
  useEffect(() => {
    setShowResults(false);
    setSearchQuery("");
    setIsFocused(false);
  }, [location]);

  // Debounced search
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `${API}/api/search?q=${encodeURIComponent(query)}&category=${currentCategory}&limit=8`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result) => {
    navigate(result.url);
    setShowResults(false);
    setSearchQuery("");
    setIsFocused(false);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page (you can create this later)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${currentCategory}`);
      setShowResults(false);
      setIsFocused(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleResultClick(searchResults[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 0 0 3px rgba(222, 60, 173, 0.1)"
              : "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={`Search ${currentCategory} products...`}
            className="w-full py-2 pl-10 pr-10 text-sm border border-pink-200 rounded-full focus:outline-none focus:border-pink-400 transition-all duration-300"
          />
          
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {isSearching && (
              <FaSpinner className="text-pink-500 animate-spin text-sm" />
            )}
            {searchQuery && !isSearching && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>
        </motion.div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-white border border-pink-100 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              
              {searchResults.map((result, index) => (
                <motion.div
                  key={result._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleResultClick(result)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                    selectedIndex === index ? 'bg-pink-100' : 'hover:bg-pink-50'
                  }`}
                >
                  {result.images && result.images[0] ? (
                    <img
                      src={result.images[0]}
                      alt={result.title}
                      className="w-12 h-12 object-cover rounded-md border border-pink-100"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-pink-100 rounded-md flex items-center justify-center">
                      <FaSearch className="text-pink-400 text-sm" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium truncate transition-colors ${
                      selectedIndex === index ? 'text-pink-700' : 'text-gray-800 group-hover:text-pink-600'
                    }`}>
                      {result.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {result.category}
                      {result.gender && ` • ${result.gender}`}
                    </p>
                    {result.price && (
                      <p className="text-xs font-semibold text-pink-600 mt-0.5">
                        ₹{result.price}
                      </p>
                    )}
                  </div>
                  
                  <div className={`transition-opacity ${
                    selectedIndex === index ? 'opacity-100 text-pink-600' : 'text-pink-400 opacity-0 group-hover:opacity-100'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {searchQuery.trim().length >= 2 && (
              <div className="border-t border-pink-100 p-3 bg-pink-50">
                <button
                  onClick={handleSubmit}
                  className="w-full text-center text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors"
                >
                  View all results for "{searchQuery}"
                </button>
              </div>
            )}
          </motion.div>
        )}
        
        {showResults && searchQuery.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white border border-pink-100 rounded-xl shadow-xl p-6 text-center z-50"
          >
            <FaSearch className="text-gray-300 text-3xl mx-auto mb-2" />
            <p className="text-sm text-gray-600">No results found for "{searchQuery}"</p>
            <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
