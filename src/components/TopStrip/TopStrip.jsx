import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function TopStrip() {
  const [topStrip, setTopStrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStrip = async () => {
      try {
        const response = await axios.get(`${API}/api/top-strip`);
        setTopStrip(response.data);
      } catch (error) {
        console.error("Error fetching top strip:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStrip();
  }, []);

  // Don't show if loading, not active, or no data
  if (loading || !topStrip || !topStrip.isActive) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-center py-2 text-sm">
      <p>{topStrip.message}</p>
    </div>
  );
}
