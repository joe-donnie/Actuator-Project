import React, { useState } from "react";

const ActuatorSelector = () => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="space-y-2 text-[12px]">
      {/* First Row */}
      <div className="grid grid-cols-3 gap-1">
        {/* Supply Pressure */}
        <div>
          <h2 className="text-[#08549c] font-bold mb-1">Actuator Selector</h2>
          <label className="block font-semibold mb-[2px]">Supply Pressure:</label>
          <div className="flex items-center gap-1">
            <select className="bg-[#d9d9d9] text-black px-1 py-0.5 rounded w-[90px] h-[24px]">
              <option>SELECT</option>
            </select>
            <span className="text-black">bar</span>
          </div>
        </div>

        {/* Actuator Type */}
        <div>
          <label className="block font-semibold mb-[2px] mt-[22px]">Actuator Type:</label>
          <div className="flex flex-col gap-[2px] text-black">
            <label className="flex items-center gap-1">
              <input type="radio" name="actuatorType" defaultChecked />
              Spring Return
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="actuatorType" />
              Double Acting
            </label>
          </div>
        </div>

        {/* Actuator Series */}
        <div>
          <label className="block font-semibold mb-[2px] mt-[22px]">ctuator Series:</label>
          <div className="flex flex-col gap-[1px] text-black">
            {[
              "S92/93 - Rack & Pinion Actuator",
              "S92/93EH - R&P Electro Hydraulic Actuator",
              "S98 - Pneumatic Scotch Yoke Actuator",
              "S98H - Hydraulic Scotch Yoke Actuator",
              "S98EH - SY Electro Hydraulic Actuator",
            ].map((series, i) => (
              <label key={i} className="flex items-start gap-1">
                <input type="radio" name="series" defaultChecked={i === 0} />
                {series}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-1">
        {/* Actuator Selected */}
        <div>
          <label className="font-semibold block mb-[2px]">Actuator Selected</label>
          <div className="space-y-[2px] text-black">
            {["Actuator Model", "Actuator Size", "No. of Spring"].map(
              (label, i) => (
                <div key={i} className="flex items-center gap-1">
                  <label className="w-[100px]">{label}</label>
                  <input
                    type="text"
                    className="w-[100px] bg-[#d9d9d9] px-1 py-0.5 rounded h-[22px]"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Fail Safe Condition */}
        <div>
          <label className="font-semibold block mb-[2px]">Fail Safe Condition</label>
          <div className="space-y-[2px] text-black">
            <label className="flex items-center gap-1">
              <input type="radio" name="fail" defaultChecked />
              Fail Close (FCW)
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="fail" />
              Fail Open (FCCW)
            </label>
          </div>
        </div>

        {/* Orientation & Manual Override */}
        <div className="space-y-[6px]">
          <div>
            <label className="block mb-[2px] font-semibold">Act. Orientation</label>
            <select className="w-full bg-[#d9d9d9] text-black px-1 py-0.5 rounded h-[24px]">
              <option>Perpendicular To Pipe</option>
            </select>
          </div>
          <div>
            <label className="block mb-[2px] font-semibold">Manual Override</label>
            <select className="w-full bg-[#d9d9d9] px-1 py-0.5 rounded text-black h-[24px]">
              <option>None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-2">
        <button
          className="bg-[#08549c] text-white px-4 py-1.5 rounded font-semibold cursor-pointer hover:bg-blue-800 mt-[8px]"
          onClick={() => setShowButtons(true)}
        >
          Select Actuator
        </button>

        {showButtons && (
          <div className="flex gap-2 mt-2">
            <button className="bg-[#08549c] text-white px-3 py-1.5 rounded font-semibold hover:bg-blue-800 cursor-pointer">
              Actuator Configuration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActuatorSelector;
