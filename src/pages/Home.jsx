import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [actuators, setActuators] = useState([]);
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  useEffect(() => {
    const fetchActuators = async () => {
      try {
        const params = {};
        if (sort) params.sort = sort;
        if (size) params.size = size;

        const query = new URLSearchParams(params).toString();
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_FILTER_DATA}${query ? "?" + query : ""}`
        );
        const data = await res.json();
        setActuators(data.data || []);
      } catch (error) {
        console.error("Error fetching actuators:", error);
      }
    };
    fetchActuators();
  }, [sort, size]);

  const clearFilters = () => {
    setSort("");
    setType("");
    setSize("");
  };

  return (
    <div className="min-h-screen w-full p-8 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-[#084b8a] mb-12 drop-shadow-xl tracking-tight">
        Actuator Catalog
      </h1>

      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap gap-6 mb-14 justify-center w-full max-w-6xl">
        <div className="flex flex-col">
          <label className="mb-1 text-black font-semibold">Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#08549c] text-white border border-[#0c3c7e] px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-black font-semibold">Filter by Size</label>
          <div className="flex items-center gap-3">
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-[#08549c] text-white border border-[#0c3c7e] px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            >
              <option value="">All Sizes</option>
              <option value="Small">Small</option>
              <option value="Large">Large</option>
            </select>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {actuators.length === 0 ? (
        <p className="text-xl text-[#084b8a] font-semibold">No actuators found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl">
          {actuators.map((actuator) => (
            <div
              key={actuator._id}
              className="bg-white border border-blue-100 backdrop-blur-sm shadow-lg rounded-3xl p-6 w-full max-w-xs transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-center text-[#0a4c91] mb-1">
                {actuator.name}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-3">
                Model:{" "}
                <span className="font-medium text-gray-800">
                  {actuator.modelNumber}
                </span>
              </p>
              <div className="flex flex-col gap-1 text-sm mb-3 text-gray-700">
                <span><b>Type:</b> {actuator.type}</span>
                <span><b>Size:</b> {actuator.size}</span>
              </div>
              <div className="mt-3 text-center text-xl font-extrabold text-green-600 tracking-wide">
                ₹{actuator.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
