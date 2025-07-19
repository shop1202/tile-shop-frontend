import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Arman Tiles</h1>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link
                to="/"
                className={`hover:underline ${location.pathname === "/" ? "underline" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/purchase"
                className={`hover:underline ${location.pathname === "/purchase" ? "underline" : ""}`}
              >
                Purchase
              </Link>
            </li>
            <li>
              <Link
                to="/sale"
                className={`hover:underline ${location.pathname === "/sale" ? "underline" : ""}`}
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto py-8 px-4 text-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
