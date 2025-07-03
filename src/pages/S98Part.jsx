  import React from "react";
  import { useEffect, useState,useCallback } from "react";

  function Configuration({formData}) {
    // Left Card Fields State
    const [series, setSeries] = useState("98");
    const [actuatorSize, setActuatorSize] = useState("");
    const [boreSize, setBoreSize] = useState("");
    const [cylinderSize, setCylinderSize] = useState("");
    const [mop, setMop] = useState("");
    const [springSize, setSpringSize] = useState("");
    const [baseCode, setBaseCode] = useState("213");
    const [action, setAction] = useState("");
    const [mountingYoke, setMountingYoke] = useState("");
    const [ports, setPorts] = useState("");
    const [standardOptions, setStandardOptions] = useState("");
    const [designCodeOptions, setDesignCodeOptions] = useState([]);
    const [designCode, setDesignCode] = useState("Standard Pneumatic"); // string for selected value
    const [materialOptions, setMaterialOptions] = useState([]);
    const [material, setMaterial] = useState("");
    const [tempTrimOptions, setTempTrimOptions] = useState([]);
    const [tempTrim, setTempTrim] = useState(""); 
    const [coatingOptions, setCoatingOptions] = useState([]); // for list of options
    const [coatings, setCoatings] = useState("");             // selected value 
    const [orientation, setOrientation] = useState("1H1");

    const [isKitChecked, setIsKitChecked] = useState(false);
    const [repairType, setRepairType] = useState("");
    const [partNumber, setPartNumber] = useState("");
    const [safetyFactor, setSafetyFactor] = useState("");
    const [stemDiameter, setStemDiameter] = useState("");
    const [valveType, setValveType] = useState()
    const valveTorques = {
      "Break to Open": "",
      "Run to Open": "",
      "End to Open": "",
      "Break to Close": "",
      "Run to Close": "",
      "End to Close": "",
    };

    const actuatorTorques = {
      "Spring Start": "",
      "Spring Min": "",
      "Spring End": "",
      "Pneumatic Start": "",
      "Pneumatic Min": "",
      "Pneumatic End": "",
    };

    const actualSF = {
      "Spring Start": "",
      "Spring Min": "",
      "Spring End": "",
      "Pneumatic Start": "",
      "Pneumatic Min": "",
      "Pneumatic End": "",
    };
    
          // Fetch Standard Options
          const [stdopt, setStdOpt] = useState([])

                    useEffect(() => {
                const fetchStdOpt = async () => {
                  try {
                    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_FORM_DOPT}`, {
                      method: "GET",
                    });
                    const data = await res.json();
                    setStdOpt(data.data || []);
                  } catch (error) {
                    console.error("Failed to fetch standard options:", error);
                  }
                };
                fetchStdOpt();
              }, []);

            // fetch Design code

          useEffect(() => {
          const fetchDesignCode = async () => {
            try {
              const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_DESIGNCODE}`, {
                method: "GET",
              });
              const data = await res.json();

              console.log("Fetched Design Codes:", data.data); // ✅ Log it here

              setDesignCodeOptions(data.data || []);
            } catch (error) {
              console.error("Failed to fetch design codes:", error);
            }
          };
          fetchDesignCode();
        }, []);

        // fetch Material
        useEffect(() => {
          const fetchMaterial = async () => {
            try {
              const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_MATERIAL}`);
              const data = await res.json();
              console.log("Fetched Material:", data.data);
              setMaterialOptions(data.data || []);
            } catch (error) {
              console.error("Failed to fetch material options:", error);
            }
          };
          fetchMaterial();
        }, []);
        
        // fetch Temp Trim
        useEffect(() => {
        const fetchTempTrim = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_TEMPTRIM}`);
            const data = await res.json();
            console.log("Fetched Temp Trim:", data.data);
            setTempTrimOptions(data.data || []);
          } catch (error) {
            console.error("Failed to fetch temp trim options:", error);
          }
        };
        fetchTempTrim();
      }, []);
        
      //  fetch Coatings
     useEffect(() => {
      const fetchCoating = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_COATING}`);
          const data = await res.json();
          console.log("Fetched Coating:", data.data);
          setCoatingOptions(data.data || []);
        } catch (error) {
          console.error("Failed to fetch coating options:", error);
        }
      };
      fetchCoating();
    }, []);

    useEffect(() => {
      const savedSF = localStorage.getItem("safetyFactor");
      if (savedSF) setSafetyFactor(savedSF);
    }, []);
    
    // get safetyFactor
useEffect(() => {
  const fetchLatestSF = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_SAFETY_FACTOR}`);
      const result = await res.json();
      console.log("Fetched SF data:", result);
      if (result.success && result.data && result.data.safetyFactor) {
        setSafetyFactor(result.data.safetyFactor); // ✅ last entered SF
      } else {
        setSafetyFactor(""); // fallback value if nothing found
      }
    } catch (err) {
      console.error("Error fetching Safety Factor:", err);
    }
  };

  fetchLatestSF();
}, []);

useEffect(() => {
  const fetchLatestStemDiameter = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_STEM_DIAMETER}`);
      const result = await res.json();

      console.log("Fetched Stem Diameter data:", result);
      if (result.success && result.data && result.data.stemDiameter) {
        setStemDiameter(result.data.stemDiameter); // ✅ last entered Stem Diameter
      } else {
        setStemDiameter(""); // fallback value
      }
    } catch (err) {
      console.error("Error fetching Stem Diameter:", err);
    }
  };

  fetchLatestStemDiameter();
}, []);

useEffect(() => {
  const storedValveType = localStorage.getItem("valveType");
  if (storedValveType) {
    setValveType(storedValveType);
  }
}, []);

    const handleSelectActuator = useCallback(async () => {
  // ✅ Log the value from .env
  console.log("ACTUATOR_PROXY_API from env:", ACTUATOR_PROXY_API);

  if (!ACTUATOR_PROXY_API) {
    showAlert("API endpoint not configured", "error");
    console.error("ACTUATOR_PROXY_API environment variable is not set");
    return;
  }

  if (!formData.supplyPressure || !formData.valveType || !formData.yokeType) {
    showAlert("Please fill all required fields", "error");
    return;
  }

  // const endToCloseValue = parseFloat(formData.endToClose) || 0;
  // const adjustedEndToClose = endToCloseValue * 1.25;

  const requestData = {
    // actuatorType:
    //   formData.actuatorType === "Spring Return" ? "Spring" : "Double",
    actuatorYokeType: formData.yokeType,
    operatingPressure: parseFloat(formData.supplyPressure),
    // endCloseValue: adjustedEndToClose || 0,
    failSafeValue: (formData.failSafeAction || "").includes("Fail Close")
      ? "FailClose"
      : "FailOpen",
  };

//   console.log(requestData, "requestData");

// try {
//   const response = await fetch(ACTUATOR_PROXY_API, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(requestData),
//   });

//   if (!response.ok) throw new Error("Failed to fetch actuator data");

//   const data = await response.json();
//   console.log("API Response:", data);

//   // Fixed: Use correct property names from API response
//   setFormData((prev) => ({
//     ...prev,
//     actuatorModel: data.actuatorName,
//     pneumaticStart:
//       data.pneumaticStart?.toString() ||
//       data.pnuematicStart?.toString() ||
//       "",
//     pneumaticMin:
//       data.pneumaticMid?.toString() || data.pnuematicMid?.toString() || "",
//     pneumaticEnd:
//       data.pneumaticEnd?.toString() || data.pnuematicEnd?.toString() || "",
//     springStart: data.springStart?.toString() || "",
//     springMin: data.springMid?.toString() || "",
//     springEnd: data.springEnd?.toString() || "",
//     actualSF: {
//       pneumaticStart: calculateSF(
//         data.pneumaticStart || data.pnuematicStart,
//         prev.breakToOpen
//       ),
//       pneumaticMid: calculateSF(
//         data.pneumaticMid || data.pnuematicMid,
//         prev.runToOpen
//       ),
//       pneumaticEnd: calculateSF(
//         data.pneumaticEnd || data.pnuematicEnd,
//         prev.endToOpen
//       ),
//         springStart: calculateSF(data.springStart, prev.breakToClose),
//     springMid: calculateSF(data.springMid, prev.runToClose),
//     springEnd: calculateSF(data.springEnd, prev.endToClose),
//   },
// }));

// showAlert("Actuator selected successfully!", "success");
// setShowButtons(true);
// } catch (error) {
//   console.error("Error selecting actuator:", error);
//   showAlert("Failed to select actuator", "error");
// }
}, [formData]);

// const clearAllData = useCallback(() => {
//   setFormData(INITIAL_FORM_DATA);
//   setSelectedValveType("");
//   setAlert(null);
//   showAlert("All data cleared successfully!", "info");
// }, [showAlert]);

    return (
      <div className="bg-gray-100 p-4">
        <div className="max-w-[1280px] mx-auto flex flex-wrap gap-6">
          {/* Left Box */}
          <div className="bg-white rounded-md p-4 text-sm space-y-2 w-[360px] shrink-0">
            <Section>
              <div className="space-y-2">
                <Fiel label="Series" value={series} onChange={setSeries} readOnly={true} />
                <Fiel label="Actuator Size" value={actuatorSize} onChange={setActuatorSize} />
                <Fiel label="Bore Size" value={boreSize} onChange={setBoreSize} />
                <Fiel label="Cylinder Size" value={cylinderSize} onChange={setCylinderSize} />
                <Fiel label="MOP" value={mop} onChange={setMop} />
                <Fiel label="Spring Size" value={springSize} onChange={setSpringSize} />
                <Fiel label="Base Code" value={baseCode} onChange={setBaseCode} readOnly={true}/>
                <Fiel label="Action" value={action} onChange={setAction} />
                <Fiel label="Mounting/Yoke" value={mountingYoke} onChange={setMountingYoke} />
                <Fiel label="Ports" value={ports} onChange={setPorts} />
                <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="w-1/2 text-xs text-gray-600">Standard Options</label>
                    <select
                      value={standardOptions}
                      onChange={(e) => setStandardOptions(e.target.value)}
                      className="w-70 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-200"
                    >
                      <option value="">None</option>
                      {stdopt.map((opt) => (
                        <option key={opt._id} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="w-1/2 text-xs text-gray-600">Design Code</label>
                  <select
                  value={designCode}
                  onChange={(e) => setDesignCode(e.target.value)}
                  className="w-70 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-200"
                >
                  {designCodeOptions.map((opt) => (
                    <option key={opt._id} value={opt.designCode}>
                      {opt.designCode}
                    </option>
                  ))}
                </select>
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="w-1/2 text-xs text-gray-600">Material</label>
                  <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-70 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-200"
                >
                  {materialOptions.map((opt) => (
                    <option key={opt._id} value={opt.designCode}>
                      {opt.material}
                    </option>
                  ))}
                </select>
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                <label className="w-1/2 text-xs text-gray-600">Temp Trim</label>
                <select
                  value={tempTrim}
                  onChange={(e) => setTempTrim(e.target.value)}
                  className="w-55 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-200"
                >
                  {tempTrimOptions.map((opt) => (
                    <option key={opt._id} value={opt.tempTrim}>
                      {opt.tempTrim}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <label className=" text-xs text-gray-600 w-10">Coatings</label>
                <select
                  value={coatings}
                  onChange={(e) => setCoatings(e.target.value)}
                  className="w-51 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-200"
                >
                  {coatingOptions.map((opt) => (
                    <option key={opt._id} value={opt.coating}>
                      {opt.coating}
                    </option>
                  ))}
                </select>
              </div>
                <Fiel label="Orientation" value={orientation} onChange={setOrientation} readOnly={true} />
              </div>

              <button className="bg-[#08549c] h-10 w-32.5 text-white rounded-[5px] mt-4 ml-auto block">
                Orientation
              </button>
            </Section>

            <Section>
              <div className="border border-gray-400 px-4 py-2 inline-flex items-center gap-4 text-sm">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={isKitChecked}
                    onChange={() => setIsKitChecked(!isKitChecked)}
                    className="accent-gray-700"
                  />
                  <span className="text-gray-800">Kit</span>
                </label>

                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="repairType"
                    value="Seal"
                    checked={repairType === "Seal"}
                    onChange={() => setRepairType("Seal")}
                    className="accent-gray-700"
                  />
                  <span className="text-gray-400">Seal</span>
                </label>

                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="repairType"
                    value="Repair"
                    checked={repairType === "Repair"}
                    onChange={() => setRepairType("Repair")}
                    className="accent-gray-700"
                  />
                  <span className="text-gray-400">Repair</span>
                </label>
              </div>

              <div className="mt-4">
                <Field label="Part Number" value={partNumber} onChange={(e) => setPartNumber(e.target.value)} />
              </div>
            </Section>
          </div>

          {/* Right Box */}
          <div className="bg-white rounded-md p-4 text-sm flex-1 min-w-[0]">
            <Section title={<span className="text-[#08549c] font-semibold text-base">Valve Information</span>}>
              <div className="grid grid-cols-3 gap-6 mb-4">
                <Field label="Valve Type" value={valveType} />
                <Field label="Required SF" value={safetyFactor} onChange={setSafetyFactor} readOnly={true} />
                <div className="flex flex-col">
                  <label className="text-xs text-gray-700 mb-1">Mast Value</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="bg-gray-200 text-xs px-2 py-1 rounded border border-gray-300 w-full"
                      placeholder="Nm"
                    />
                  </div>
                </div>                
              </div>

              <div className="grid grid-cols-3 gap-6 mb-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-700 mb-1">Stem Diameter</label>
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="flex items-center text-xs text-gray-700">
                      <input type="radio" name="stem" value="inch" className="accent-gray-700 mr-1" />
                      Inch
                    </label>
                    <label className="flex items-center text-xs text-gray-700">
                      <input type="radio" name="stem" value="metric" className="accent-gray-700 mr-1" defaultChecked />
                      Metric
                    </label>
                    <input
                      type="text"
                      value={stemDiameter}
                      onChange={(e) => setStemDiameter(e.target.value)}
                      className="bg-gray-200 text-xs px-2 py-1 rounded border border-gray-300 max-w-[177px] w-39"
                      readOnly={true}
                    />

                  </div>
                </div>
                <Field label="Additional Information" />              

                <Field label="Mounting Flange" />
              </div>

              <div className="grid grid-cols-3 gap-6 mb-4">
                <h4 className="text-gray-700 text-[12px]">Mounting Kit :</h4>
                <br />
                <h4 className="text-gray-700 text-[12px]">VMC :</h4>
              </div>
            </Section>

            <div className="grid grid-cols-3 gap-6 mt-4 text-sm">
              <div>
                <h3 className="text-[#08549c] font-semibold mb-2">Valve Torques</h3>
                {Object.entries(valveTorques).map(([label, value]) => (
                  <TorqueRow key={label} label={label} value={value} unit="Nm" />
                ))}
              </div>

              <div>
                <h3 className="text-[#08549c] font-semibold mb-2">Actuator Torques</h3>
                {Object.entries(actuatorTorques).map(([label, value]) => (
                  <TorqueRow key={label} label={label} value={value} unit="Nm" />
                ))}
              </div>

              <div>
                <h3 className="text-[#08549c] font-semibold mb-2">Actual S.F.</h3>
                {Object.entries(actualSF).map(([label, value]) => (
                  <TorqueRow key={label} label={label} value={value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Section({ title, children }) {
    return (
      <div className="mb-4">
        {title && <h3 className="text-sm font-semibold text-gray-800 mb-2">{title}</h3>}
        {children}
      </div>
    );
  }

  function Field({ label, value = "", onChange, readOnly = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly} // ✅ added
        className="bg-gray-200 text-xs px-2 py-1 rounded border border-gray-300 w-full"
      />
    </div>
  );
}


  function Fiel({ label, value, onChange, readOnly = false }) {
    return (
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="w-20 text-xs text-gray-600">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          className={`w-51 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-200 ${
            readOnly ? "text-gray-500 cursor-not-allowed" : "focus:outline-none focus:ring-1 focus:ring-blue-500"
          }`}
        />
      </div>
    );
  }

  function TorqueRow({ label, value, unit }) {
    return (
      <div className="flex items-center justify-between mb-2">
        <span className="w-32 text-xs text-gray-700">{label}</span>
        <input
          type="text"
          readOnly
          value={value}
          className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded w-20 text-right"
        />
        {unit && <span className="text-gray-500 ml-1 text-xs">{unit}</span>}
      </div>
    );
  }

  export default Configuration;
