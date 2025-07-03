import React, { useState, useEffect } from "react";
import actuatorImage from "../assets/actuator.jpg.jpeg";
import { useNavigate } from "react-router-dom";
import Configuration from "./S98Part.jsx";

// Editable dropdown
const EditableSelect = ({ options, listId, defaultValue, className = "", onChange }) => {
  const [value, setValue] = useState(defaultValue || "");
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };
  return (
    <>
      <input list={listId} value={value} onChange={handleChange} className={className} />
      <datalist id={listId}>
        {options.map((opt, i) => <option key={i} value={opt} />)}
      </datalist>
    </>
  );
};

// Reusable radio group
const RadioGroup = ({ name, options, defaultIndex = 0, onChange }) => (
  <div className="flex flex-col gap-1">
    {options.map((option, i) => (
      <label key={i} className="flex items-center gap-1 text-black">
        <input
          type="radio"
          name={name}
          defaultChecked={i === defaultIndex}
          onChange={() => onChange?.(option)}
        />
        {option}
      </label>
    ))}
  </div>
);

export default function ActuatorSizing({ setActiveTab }) {
//   const [formData, setFormData] = useState({
//   actuatorType: "",          // "Spring" or "Double Acting"
//   actuatorYokeType: "",      // "Preferred" / "Symmetric" / "Canted"
//   operatingPressure: "",     // bar value from valvePressure list
//   endCloseValue: "",         // you update this elsewhere
//   failSafeValue: "",         // "FailClose" or "FailOpen"
// });
// /* 2 ──── POST HELPER ──── */
//   const postFormData = async (payload) => {
//     try {
//       const res = await fetch(
//         "http://localhost:5000/api/valve/actuator-proxy",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );
//       const data = await res.json();
//       if (!data.success) {
//         console.error("Server rejected formData:", data.message);
//       }
//     } catch (err) {
//       console.error("Error posting formData:", err);
//     }
//   };

// const updateForm = (patch) =>
//   setFormData((prev) => {
//     const next = { ...prev, ...patch };
//     console.log("formData →", next);
//     postFormData(next);   // LOG every time it changes
//     return next;
//   });
/* 1 ──── STATE ──── */
const [formData, setFormData] = useState({
  actuatorType: "",          // "Spring" or "Double Acting"
  actuatorYokeType: "",      // "Preferred" / "Symmetric" / "Canted"
  operatingPressure: "",     // bar value from valvePressure list
  endCloseValue: "",         // you update this elsewhere
  failSafeValue: "",         // "FailClose" or "FailOpen"
});

/* 2 ──── POST HELPER ──── */
const postFormData = async (payload) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_POST_HELPER}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    // ✅ Always log whatever the server sent
    console.log("Backend response:", data);

    if (data.success=== false) {
      console.error("Server rejected formData:", data.message);
      return data;
    }

  
  const t = data.torque || data;      // tolerate either shape
 setActTorque({
 pneumaticStart : t.pnuematicStart  ?? "",
 pneumaticMin   : t.pnuematicMid    ?? "",
pneumaticEnd   : t.pnuematicEnd    ?? "",
springStart    : t.springStart     ?? "",
springMin      : t.springMid       ?? "",
springEnd      : t.springEnd       ?? "",
// pneumaticStart2: t.pneumaticStart2 ?? "",
// pneumaticMin2  : t.pneumaticMin2   ?? "",
// pneumaticEnd2  : t.pneumaticEnd2   ?? "",
 });
 setSelectedActuatorName(data.actuatorName ?? "");
 

    return data;           // ← Return it so callers can chain on it
  } catch (err) {
    console.error("Error posting formData:", err);
    throw err;             // Re‑throw so callers can catch
  }
};

/* 3 ──── UPDATE WRAPPER ──── */
// const updateForm = (patch) => {
//   setFormData((prev) => {
//     const next = { ...prev, ...patch };
//     console.log("formData →", next);

//     // Chain a then() so we can react to the async result
//     postFormData(next)
//       .then((data) => {
//         // Do anything extra with the result if needed
//         // (It’s already logged inside postFormData.)
//       })
//       .catch((err) => {
//         // Optional: handle or display network/server errors here
//       });

//     return next;
//   });
// };
const updateForm = (patch) => {
  setFormData((prev) => {
    const next = { ...prev, ...patch };
    console.log("formData →", next);   // still log the merged state
    return next;                       // ⬅️ no more postFormData() here
  });
};


  const [actuatorSeries, setActuatorSeries] = useState("Spring Return");
  const [selectedActuatorSeries, setSelectedActuatorSeries] = useState("");
  const [valveData, setValveData] = useState([]);
  const [valvePressure, setValvePressure] = useState([]);
  const [actuatorType, setActuatorType] = useState([]);
  const [valveType, setValveType] = useState("");
  const [safetyFactor, setSafetyFactor] = useState("1.25");
  const [stemDiameter, setStemDiameter] = useState("");
  const [stemUnit, setStemUnit] = useState("Metric");
  const [showButtons, setShowButtons] = useState(false);
  const [torqueMode, setTorqueMode] = useState("6");
  const [selectedActuatorName, setSelectedActuatorName] = useState("");


  const [valveTorques, setValveTorques] = useState({
    breakToOpen: "",
    runToOpen: "",
    endToOpen: "",
    breakToClose: "",
    runToClose: "",
    endToClose: "",
  });
  const [actTorque, setActTorque] = useState({
pneumaticStart : "",
 pneumaticMin   : "",
 pneumaticEnd   : "",
springStart    : "",
springMin      : "",
springEnd      : "",
/* optional second set for double‑acting */
// pneumaticStart2: "",
//  pneumaticMin2  : "",
// pneumaticEnd2  : "",
});

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_VALVE}`)
      .then(res => res.json())
      .then(data => setValveData(data.data || []))
      .catch(err => console.error("Failed to fetch valve data", err));

    fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_PRESSURE}`)
      .then(res => res.json())
      .then(data => setValvePressure(data.data || []))
      .catch(err => console.error("Failed to fetch pressure", err));

    fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_ACTUATOR}`)
      .then(res => res.json())
      .then(data => setActuatorType(data.data || []))
      .catch(err => console.error("Failed to fetch actuators", err));
  }, []);

  useEffect(() => {
    if (actuatorType.length > 0 && selectedActuatorSeries === "") {
      const defaultSeries = actuatorType.find(a => a.name === "S98 - Pneumatic Scotch Yoke Actuator");
      if (defaultSeries) setSelectedActuatorSeries(defaultSeries.name);
    }
  }, [actuatorType]);

  const clearFields = () => {
    setValveType("");
    setSafetyFactor("1.25");
    setStemDiameter("");
    setStemUnit("Metric");
    setValveTorques({
      breakToOpen: "", runToOpen: "", endToOpen: "",
      breakToClose: "", runToClose: "", endToClose: ""
    });
  };

  const butterflyCalc = (value) => {
    const b = parseFloat(value) || 0;
    const updated = {
      breakToOpen: b,
      runToOpen: Math.round(b * 0.3),
      endToOpen: Math.round(b * 0.3),
      breakToClose: Math.round(b * 0.3),
      runToClose: Math.round(b * 0.3),
      endToClose: b,
    };
    setValveTorques(updated);
    updateForm({ endCloseValue: String(updated.endToClose) });
  };

  const ballCalc = (value) => {
    const b = parseFloat(value) || 0;
    const updated = {
      breakToOpen: b,
      runToOpen: Math.round(b * 0.75),
      endToOpen: Math.round(b * 0.8),
      breakToClose: Math.round(b * 0.8),
      runToClose: Math.round(b * 0.75),
      endToClose: Math.round(b * 0.9),
    };
    setValveTorques(updated);
    updateForm({ endCloseValue: String(updated.endToClose) });
  };

  const saveSafetyFactorToDB = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_SAFETY_FACTOR}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ safetyFactor }),
      });
    } catch (err) {
      console.error("Error saving SF:", err);
    }
  };

  const saveStemDiameterToDB = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_STEM_DIAMETER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stemDiameter }),
      });
    } catch (err) {
      console.error("Error saving stem diameter:", err);
    }
  };

  const handleSaveAndNavigate = async () => {
    await saveSafetyFactorToDB();
    await saveStemDiameterToDB();
    localStorage.setItem("valveType", valveType);
    if (setActiveTab) setActiveTab("S98 Part#");
  };

  const visibleTorqueFields = torqueMode === "6"
    ? [["Break to Open", "breakToOpen"], ["Run to Open", "runToOpen"], ["End to Open", "endToOpen"], ["Break to Close", "breakToClose"], ["Run to Close", "runToClose"], ["End to Close", "endToClose"]]
    : [["Break to Open", "breakToOpen"], ["Running", "runToOpen"], ["End to Close", "endToClose"]];

  const sfCount = visibleTorqueFields.length;
  const maxRows = 6;
  // const handleSelectActuator = async () => {
  //   console.log("Select‑Actuator clicked");  // debug line
  //   try {
  //     const endCloseValue= formData.endCloseValue*1.25;
  //     await postFormData({ ...formData, endCloseValue });          // send current data once
  //     setShowButtons(true);
  //   } catch (err) {
  //     console.error("POST failed:", err);
  //   }
  // };
  const handleSelectActuator = async () => {
  console.log("Select-Actuator clicked");      // debug line
  try {
    const endCloseValue = formData.endCloseValue * 1.25;

    /* NEW — derive a fallback if the field is still blank */
    const resolvedActType =
      formData.actuatorType ||
      (actuatorSeries === "Spring Return" ? "Spring" : "Double Acting");

    await postFormData({
      ...formData,
      actuatorType: resolvedActType,            // ← always present
      endCloseValue,
    });

    setShowButtons(true);
  } catch (err) {
    console.error("POST failed:", err);
  }
};


  // This is a **JSX-only summary**; UI rendering can be adapted from the large return block you've already implemented.

  /* ---------- derive Actual Safety‑Factor values ---------- */
const sfValues = React.useMemo(() => {
  // helper for safe number conversion
  const n = (x) => Number(x) || 0;

  /* valve‑torque keys in the order you render them */
  const valveKeys =
    torqueMode === "6"
      ? ["breakToOpen", "runToOpen", "endToOpen",
         "breakToClose", "runToClose", "endToClose"]
      : ["breakToOpen", "runToOpen", "endToClose"];

  /* matching actuator‑torque keys in the SAME order */
  let actKeys = ["pneumaticStart", "pneumaticMin", "pneumaticEnd"];
  if (torqueMode === "6") {
    actKeys = actuatorSeries === "Double Acting"
      ? [...actKeys, "pneumaticStart2", "pneumaticMin2", "pneumaticEnd2"]
      : [...actKeys, "springStart", "springMin", "springEnd"];
  }

  /* produce one ratio per row ('' if divide‑by‑zero) */
  return valveKeys.map((vKey, i) => {
    const a = n(actTorque[actKeys[i]]);
    const v = n(valveTorques[vKey]);
    return v ? (a / v).toFixed(2) : "";
  });
}, [actTorque, valveTorques, torqueMode, actuatorSeries]);


  return (
  
  <div className="p-3 text-[12px] font-sans space-y-4 bg-gray-100">
    {/* ────────────── TOP CARD CONTAINER ────────────── */}
    <div className="flex gap-3">
      {/* LEFT CARD ─ Default Sizing Units */}
      <div className="bg-white p-4 rounded-lg shadow-md w-[425px] h-[335px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-[12px] text-[#08549c]">Default Sizing Units</p>
          <button
            onClick={clearFields}
            className="bg-[#08549c] hover:bg-blue-800 text-white px-4 py-1 rounded text-[12px]"
          >
            Clear All
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[12px]">
          {/* Valve Type */}
          <label className="self-center font-bold text-[12px] text-black">Valve Type:</label>
          <select
            value={valveType}
            onChange={(e) => {
              const value = e.target.value;
              setValveType(value);
              setValveTorques({
                breakToOpen: "",
                runToOpen: "",
                endToOpen: "",
                breakToClose: "",
                runToClose: "",
                endToClose: "",
              });
            }}
            className="bg-[#d9d9d9] text-gray-700 text-[12px] px-2 py-1 rounded w-[130px] ml-14"
          >
            <option value="">Select Valve Type</option>
            {valveData.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Safety Factor */}
          <label className="self-center font-bold text-[12px] text-black">Required Safety Factor:</label>
          <div>
            <input
              type="text"
              value={safetyFactor}
              onChange={(e) => setSafetyFactor(e.target.value)}
              className="w-20 rounded px-2 py-1 bg-yellow-100 text-center"
            />
            <p className="text-xs text-gray-500 mt-1">(Example: 1.25)</p>
          </div>

          {/* Stem Diameter */}
          <div className="col-span-2 flex items-center gap-4">
            <label className="font-bold text-[12px] text-[#08549c] whitespace-nowrap">
              Stem Diameter:
            </label>

            {/* Inch / Metric */}
            <div className="flex gap-3">
              {["Inch", "Metric"].map((unit) => (
                <label key={unit} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="stemUnit"
                    checked={stemUnit === unit}
                    onChange={() => setStemUnit(unit)}
                  />
                  <span>{unit}</span>
                </label>
              ))}
            </div>

            <input
              type="text"
              value={stemDiameter}
              onChange={(e) => setStemDiameter(e.target.value)}
              className="bg-[#d9d9d9] rounded px-2 py-1 w-20"
            />
          </div>
        </div>
      </div>

      {/* RIGHT CARD ─ Valve & Actuator Torques */}
      <div className="relative bg-white p-4 rounded-lg shadow-md w-[850px] h-[335px] flex justify-between">
        <div className="grid grid-cols-[auto_auto_auto] gap-18 items-start">
          {/* Valve Torques */}
          <div className="ml-1 text-[12px]">
            <div className="flex items-center mb-2">
              <label className="text-[#08549c] text-[12px] font-bold mr-2 whitespace-nowrap">
                Valve Torques
              </label>
              <select
                value={torqueMode}
                onChange={(e) => setTorqueMode(e.target.value)}
                className="w-[110px] h-7 bg-[#d9d9d9] text-gray-700 rounded px-2"
              >
                <option value="6">6 Values</option>
                <option value="3">3 Values</option>
              </select>
            </div>

            <h1 className="italic text-red-700 mb-3 whitespace-nowrap">
              *You have selected: {valveType || "None"}*
            </h1>

            <div className="space-y-2">
              {visibleTorqueFields.map(([label, key]) => (
                <div key={key} className="flex items-center min-h-[28px]">
                  <label className="w-[105px]">{label}:</label>
                  <input
                    value={valveTorques[key] ?? ""}
                    disabled={!valveType}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (key === "breakToOpen") {
                        valveType?.toLowerCase().includes("ball")
                          ? ballCalc(v)
                          : butterflyCalc(v);
                      } else {
                        setValveTorques((prev) => ({ ...prev, [key]: v }));
                      }
                    }}
                    className="w-[100px] h-7 bg-gray-200 rounded px-1 text-right"
                  />
                  <span className="ml-2">Nm</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actuator Torques */}
       <div>
  <div className="text-[#08549c] text-[12px] font-bold mb-[45px]">
    Actuator Torques
  </div>

  <div className="space-y-2 text-[12px]">
    {[
      /* base three rows */
      ["Pneumatic Start" , "pneumaticStart"],
      [torqueMode === "6" ? "Pneumatic Min" : "Min Run", "pneumaticMin"],
      ["Pneumatic End"   , "pneumaticEnd"],

      /* extra three rows when torqueMode === 6 */
      ...(torqueMode === "6"
        ? actuatorSeries === "Double Acting"
          ? [
              ["Pneumatic Start2", "pneumaticStart2"],
              ["Pneumatic Min2"  , "pneumaticMin2"  ],
              ["Pneumatic End2"  , "pneumaticEnd2"  ],
            ]
          : [
              ["Spring Start" , "springStart"],
              ["Spring Min"   , "springMin"  ],
              ["Spring End"   , "springEnd"  ],
            ]
        : []),
    ].map(([label, key]) => (
      <div key={label} className="flex items-center min-h-[28px]">
        <label className="w-[130px]">{label}:</label>

        {/* value now comes from the backend‑fed state */}
        <input
          readOnly
          value={actTorque[key] ?? ""}
          className="w-[100px] h-7 bg-gray-200 rounded px-1 text-right"
        />
        <span className="ml-2">Nm</span>
      </div>
    ))}
  </div>
</div>

          {/* Actual SF */}
          {/* <div>
            <div className="text-[#08549c] text-[12px] font-bold mb-[45px] whitespace-nowrap">
              Actual S.F.
            </div>
            <div className="space-y-2">
              {Array.from({ length: sfCount }).map((_, i) => (
                <input
                  key={i}
                  readOnly
                  className="w-[50px] h-7 bg-gray-200 rounded px-1 text-center"
                />
              ))}
            </div>
          </div> */}
          <div>
  <div className="text-[#08549c] text-[12px] font-bold mb-[45px] whitespace-nowrap">
    Actual S.F.
  </div>

  {/* one box per row */}
  <div className="flex flex-col space-y-2">
    {sfValues.map((val, i) => (
      <input
        key={i}
        readOnly
        value={val}
        className="w-[50px] h-7 bg-gray-200 rounded px-1 text-center"
      />
    ))}
  </div>
</div>

        </div>
      </div>
    </div>

    {/* ────────────── BOTTOM SECTION ────────────── */}
    <div className="flex gap-3">
      {/* Left image card */}
      <div className="bg-white rounded-lg shadow-md p-4 w-[425px] flex justify-center items-center">
        <img
          src={actuatorImage}
          alt="Actuator"
          className="object-contain max-h-[300px] w-auto h-auto"
        />
      </div>

      {/* Right-hand configuration card */}
      <div className="bg-white p-5 rounded-lg shadow-md w-[850px]">
        {/* Top Row */}
        <div className="flex flex-wrap justify-between mb-4">
          {/* Actuator Series */}
          <div className="min-w-[220px] text-[12px]">
            <label className="font-bold block mb-1 text-[#08549c]">Actuator Series</label>
            <div className="space-y-1">
              {actuatorType.map((item) => (
                <label key={item.name} className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="radio"
                    name="actuatorSeries"
                    value={item.name}
                    checked={selectedActuatorSeries === item.name}
                    onChange={() => setSelectedActuatorSeries(item.name)}
                    className="accent-blue-600"
                  />
                  <span>{item.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actuator Type */}
          <div className="text-[12px] ml-[-100px]">
            <label className="font-bold block mb-1 text-[#08549c] ">Actuator Type</label>
            {/* <RadioGroup
              name="actuatorType"
              options={["Spring Return", "Double Acting"]}
              defaultIndex={actuatorSeries === "Double Acting" ? 1 : 0}
              onChange={setActuatorSeries}
            /> */}
            <RadioGroup
  name="actuatorType"
  options={["Spring Return", "Double Acting"]}
  defaultIndex={formData.actuatorType === "Double Acting" ? 1 : 0}
  onChange={(label) =>{
    setActuatorSeries(label);
    updateForm({ actuatorType: label === "Spring Return" ? "Spring" : "Double Acting" })
  }}
/>

          </div>

          {/* Fail Safe / Config */}
          {/* <div className="pl-12 w-56">
            {actuatorSeries === "Spring Return" ? (
              <>
                <label className="font-bold block mb-1 text-[12px] text-[#08549c]">
                  Fail Safe Condition
                </label>
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="failSafe" value="Fail Close" /> FCW
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="failSafe" value="Fail Open" /> FCCW
                  </label>
                </div>
              </>
            ) : (
              <>
                <label className="font-bold block mb-1 text-[12px] text-[#08549c]">
                  Actuator Configuration
                </label>
                <div className="flex flex-col">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="cylinderConfig" value="Single Cylinder" /> Single
                    Cylinder
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="cylinderConfig" value="Dual Cylinder" /> Dual Cylinder
                  </label>
                </div>
              </>
            )}
          </div> */}
          <div className="pl-12 w-56">
  {actuatorSeries === "Spring Return" ? (
    <>
      <label className="font-bold block mb-1 text-[12px] text-[#08549c]">
        Fail Safe Condition
      </label>
      <div className="flex flex-col gap-1">
        {/* FCW  →  FailClose */}
        <label className="flex items-center gap-1 text-[12px]">
          <input
            type="radio"
            name="failSafe"
            value="FailClose"
            checked={formData.failSafeValue === "FailClose"}
            onChange={() => updateForm({ failSafeValue: "FailClose" })}
          />
          FCW
        </label>

        {/* FCCW →  FailOpen */}
        <label className="flex items-center gap-1 text-[12px]">
          <input
            type="radio"
            name="failSafe"
            value="FailOpen"
            checked={formData.failSafeValue === "FailOpen"}
            onChange={() => updateForm({ failSafeValue: "FailOpen" })}
          />
          FCCW
        </label>
      </div>
    </>
  ) : (
    <>
      <label className="font-bold block mb-1 text-[12px] text-[#08549c]">
        Actuator Configuration
      </label>
      <div className="flex flex-col text-[12px]">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="cylinderConfig"
            value="Single Cylinder"
          />
          Single Cylinder
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="cylinderConfig"
            value="Dual Cylinder"
          />
          Dual Cylinder
        </label>
      </div>
    </>
  )}
</div>

        </div>

        {/* Second Row */}
        {selectedActuatorSeries === "S98 - Pneumatic Scotch Yoke Actuator" && (
          <div className="grid grid-cols-3 gap-26 text-[12px] mt-4">
            {/* Supply Pressure */}
            {/* <div>
              <label className="font-bold block mb-1 text-[12px] text-[#08549c]">
                Supply Pressure
              </label>
              <div className="flex items-center gap-2">
                <select className="bg-[#d9d9d9] text-gray-700 text-[12px] px-1 py-[2px] rounded-[2px] w-[110px]">
                  <option value="">Select Pressure</option>
                  {valvePressure.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.value}
                    </option>
                  ))}
                </select>
                <span className="text-black">bar</span>
              </div>
            </div> */}
            <div>
  <label className="font-bold block mb-1 text-[12px] text-[#08549c]">
    Supply Pressure
  </label>
  <div className="flex items-center gap-2">
    <select
      className="bg-[#d9d9d9] text-gray-700 text-[12px] px-1 py-[2px] rounded-[2px] w-[110px]"
      value={formData.operatingPressure}
      onChange={(e) => updateForm({ operatingPressure: e.target.value })}
    >
      <option value="">Select Pressure</option>
      {valvePressure.map((item, idx) => (
        <option key={idx} value={item.value}>{item.value}</option>
      ))}
    </select>
    <span className="text-black">bar</span>
  </div>
</div>


            {/* Yoke Type */}
            {/* <div className="flex items-center border border-gray-300 rounded-[2px] px-3 py-1 bg-gray-50 h-9 w-77">
              <label className="font-semibold text-[#08549c] mr-3 whitespace-nowrap">
                Yoke Type:
              </label>
              <div className="flex gap-3">
                {["Preferred", "Symmetric", "Canted"].map((type) => (
                  <label key={type} className="flex items-center gap-1">
                    <input type="radio" name="yokeType" value={type} defaultChecked={type === "Preferred"} />
                    {type}
                  </label>
                ))}
              </div>
            </div> */}
            <div className="flex items-center border border-gray-300 rounded-[2px] px-3 py-1 bg-gray-50 h-9 w-85">
  <label className="font-semibold text-[#08549c] mr-3 whitespace-nowrap">
    Yoke Type:
  </label>
  <div className="flex gap-3">
    {["Preferred", "Symmetric", "Canted"].map((type) => (
      <label key={type} className="flex items-center gap-1">
        <input
          type="radio"
          name="yokeType"
          value={type}
          checked={formData.actuatorYokeType === type}
          onChange={() => updateForm({ actuatorYokeType: type })}
        />
        {type}
      </label>
    ))}
  </div>
</div>


            {/* PED Compliance */}
            <div className="flex border border-gray-300 rounded-[2px] px-2 py-1 bg-gray-50 h-9 w-60 mt-[50px] ml-[-305px]">
              <label className="font-semibold text-[#08549c] mr-3 whitespace-nowrap">
                PED Option:
              </label>
              <div className="flex gap-4">
                {[
                  { label: "Non PED", value: "Non PED" },
                  { label: "PED", value: "PED" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-1">
                    <input type="radio" name="ped" value={opt.value} defaultChecked={opt.value === "Non PED"} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Final Row: buttons + selected actuator */}
        <div className="flex items-end gap-4 mt-5">
          <button
            className="bg-[#08549c] text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 h-8"
            onClick={handleSelectActuator}
          >
            Select Actuator
          </button>
          {showButtons && (
            <button
              className="bg-[#08549c] text-white px-5 py-2 rounded font-semibold hover:bg-blue-800"
              onClick={handleSaveAndNavigate}
            >
              Actuator Configuration
            </button>
          )}

          <div className="ml-[-10px]">
            <label className="font-bold block mb-1 text-[#08549c]">Actuator Selected</label>
            <input
              type="text"
              readOnly
              value={selectedActuatorName}
              className="w-[140px] h-8 bg-gray-200 rounded px-2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>


  );
}

