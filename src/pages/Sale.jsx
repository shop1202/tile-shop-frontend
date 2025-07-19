import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Sale = () => {
  const location = useLocation();
  const [items, setItems] = useState(location.state?.items || []);

  useEffect(() => {
    if (!location.state?.items) {
      axios
        .get("http://192.168.1.9:3001/api/sale")
        .then((res) => setItems(res.data))
        .catch((err) => console.error("Error loading sales:", err));
    }
  }, [location.state]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-red-700 mb-4 text-center">
        Sale Page
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center">No sale items yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-lg flex justify-between"
            >
              <span className="font-semibold">{item.name}</span>
              <span>Size: {item.size}</span>
              <span>Qty: {item.quantity}</span>
              <span>Rate: ₹{item.rate}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sale;
