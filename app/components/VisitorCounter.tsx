"use client";

import { useState, useEffect } from "react";
import ApiClient from "../utils/apiClient";

export default function VisitorCounter() {
  const [counter, setCounter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        setLoading(true);
        const data = await ApiClient.getVisitorCount();
        
        if (data.dbResult && data.dbResult.counter) {
          setCounter(data.dbResult.counter.count);
        } else {
          throw new Error("Counter data not found in API response");
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch visitor count");
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, []);

  return (
    <div className="visitor-counter">
      <h2>Visitor Counter</h2>
      {loading ? (
        <p>Loading visitor count...</p>
      ) : error ? (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="counter-display">
          <p>You are visitor number:</p>
          <span className="count">{counter}</span>
        </div>
      )}
    </div>
  );
}
