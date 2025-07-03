import React, { useState } from "react";

export default function ValuePage() {
  const [actuatorSeries, setActuatorSeries] = useState("");

  const handleAdd = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ACTUATOR_TYPE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: actuatorSeries }),
      });

      const data = await res.json();
      console.log("Response from server:", data);

      // Optionally clear input after successful post
      setActuatorSeries("");

    } catch (error) {
      console.error("Error adding actuator series:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[83vh]">
      <div className="shadow-xl/90 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Add Actuator Series
        </h2>
        <div className="flex flex-col gap-4">
          <label className="text-gray-700 font-medium">
            Actuator Series Name
          </label>
          <input
            type="text"
            value={actuatorSeries}
            onChange={(e) => setActuatorSeries(e.target.value)}
            placeholder="Enter series name"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
