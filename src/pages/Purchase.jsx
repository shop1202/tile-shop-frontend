import React, { useEffect, useState } from "react";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Purchase() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
  axios.get(`${API_BASE_URL}/purchase`)
    .then((res) => {
      // Sort data from newest to oldest based on createdAt or _id timestamp
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPurchaseData(sorted);
    });
}, []);


  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 text-center">
          Purchase History
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm md:text-base border border-gray-200">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="border px-3 py-2">Item Name</th>
                <th className="border px-3 py-2">Size</th>
                <th className="border px-3 py-2">Quantity</th>
                <th className="border px-3 py-2">Rate</th>
              </tr>
            </thead>
            <tbody>
              {[...history].reverse().map((item, i) => (
                <tr key={i} className="text-center hover:bg-blue-50">
                  <td className="border px-3 py-2">{item.name}</td>
                  <td className="border px-3 py-2">{item.size}</td>
                  <td className="border px-3 py-2 text-green-700 font-medium">{item.quantity}</td>
                  <td className="border px-3 py-2 text-gray-700 font-medium">₹{item.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {history.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No purchase records yet.</p>
        )}
      </div>
    </div>
  );
}

export default Purchase;
