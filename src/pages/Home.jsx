import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL;
function Home() {
  const [rows, setRows] = useState([{ name: "", size: "", quantity: "", rate: "" }]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [saleHistory, setSaleHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // ✅ Load purchase & sale history on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [purchases, sales] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/purchase`),
        axios.get(`${apiBaseUrl}/api/sale`),
      ]);
      setPurchaseHistory(purchases.data);
      setSaleHistory(sales.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleAddRow = () => {
    setRows([...rows, { name: "", size: "", quantity: "", rate: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const getStockSummary = () => {
    const stockMap = {};

    purchaseHistory.forEach((item) => {
      if (!stockMap[item.name]) stockMap[item.name] = { purchase: 0, sale: 0 };
      stockMap[item.name].purchase += Number(item.quantity);
    });

    saleHistory.forEach((item) => {
      if (!stockMap[item.name]) stockMap[item.name] = { purchase: 0, sale: 0 };
      stockMap[item.name].sale += Number(item.quantity);
    });

    return Object.entries(stockMap).map(([name, values]) => ({
      name,
      purchaseQty: values.purchase,
      saleQty: values.sale,
      stock: values.purchase - values.sale,
    }));
  };

  const handlePurchase = async () => {
  const validRows = rows.filter(r => r.name && r.quantity && r.rate);
  if (validRows.length === 0) {
    alert("Please enter valid tile rows before purchasing.");
    return;
  }

  try {
    await axios.post(`${apiBaseUrl}/api/purchase`, { items: validRows });
    fetchData(); // refresh purchase & sale data
    setRows([{ name: "", size: "", quantity: "", rate: "" }]);
    alert("Purchase saved!");
  } catch (err) {
    console.error("Error saving purchase:", err);
    alert("Failed to save purchase.");
  }
};


  const handleSale = async () => {
  const validRows = rows.filter(r => r.name && r.quantity && r.rate);
  if (validRows.length === 0) {
    alert("Please enter valid tile rows before selling.");
    return;
  }

  const summary = getStockSummary();

  for (const row of validRows) {
    const match = summary.find(s => s.name === row.name);
    if (!match) {
      alert(`Item "${row.name}" is not in stock.`);
      return;
    }
    if (Number(row.quantity) > match.stock) {
      alert(`Cannot sell ${row.quantity} of "${row.name}". Only ${match.stock} in stock.`);
      return;
    }
  }

  try {
    await axios.post(`${apiBaseUrl}/api/sale`, { items: validRows });
    fetchData(); // refresh stock
    setRows([{ name: "", size: "", quantity: "", rate: "" }]);
    alert("Sale saved!");
  } catch (err) {
    console.error("Error saving sale:", err);
    alert("Failed to save sale.");
  }
};


  const stockData = getStockSummary();
  const filteredStockData = stockData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <main className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-4">Arman Tiles</h1>

        <div className="grid grid-cols-4 gap-4 font-semibold text-blue-700 border-b pb-2 mb-2">
          <div>Name</div>
          <div>Size</div>
          <div>Quantity</div>
          <div>Rate</div>
        </div>

        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-2">
            <input
              type="text"
              placeholder="Tile Name"
              className="border border-blue-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              value={row.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Size"
              className="border border-blue-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              value={row.size}
              onChange={(e) => handleChange(index, "size", e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border border-blue-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              value={row.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
            />
            <input
              type="number"
              placeholder="Rate"
              className="border border-blue-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              value={row.rate}
              onChange={(e) => handleChange(index, "rate", e.target.value)}
            />
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleAddRow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add More Row
          </button>
          <button
            onClick={handlePurchase}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Purchase
          </button>
          <button
            onClick={handleSale}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sale
          </button>
        </div>
      </main>

      <section className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">Stock View</h2>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by Item Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-blue-300 p-3 rounded w-1/2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-blue-300">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="px-4 py-2 border">Item Name</th>
                <th className="px-4 py-2 border">Purchase Quantity</th>
                <th className="px-4 py-2 border">Sale Quantity</th>
                <th className="px-4 py-2 border">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredStockData.map((item, index) => (
                <tr key={index} className="text-center border-t hover:bg-blue-50">
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border text-green-700 font-medium">{item.purchaseQty}</td>
                  <td className="px-4 py-2 border text-red-600 font-medium">{item.saleQty}</td>
                  <td className="px-4 py-2 border text-blue-800 font-semibold">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStockData.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No matching items found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
