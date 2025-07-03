// import React, { useState, useEffect } from "react";
// import ActuatorSelector from "./Actuatorselector";
// import ThirdComp from "./Thirdcomp";


// const EditableSelect = ({ options, placeholder, listId, defaultValue }) => {
//   const [value, setValue] = useState(defaultValue || "");

//   return (
//     <>
//       <input
//         list={listId}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder={placeholder}
//         className="bg-gray-200 rounded px-2 py-1 w-full text-sm"
//       />
//       <datalist id={listId}>
//         {options.map((opt, idx) => (
//           <option key={idx} value={opt} />
//         ))}
//       </datalist>
//     </>
//   );
// };

// export default function ActuatorSizing() {
//   const [valveData, setValveData] = useState([]);

//   useEffect(() => {
//     const fetchValveData = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/data/filter-data");
//         const data = await res.json();
//         setValveData(data.data || []);
//       } catch {
//         console.error("Failed to fetch valve data");
//       }
//     };
//     fetchValveData();
//   }, []);

//   return (
//     <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 bg-gray-100 text-sm font-sans">
//       {/* Top Left: Form */}
//       <div className="bg-white p-4 rounded-lg shadow max-h-[calc(100vh-100px)] overflow-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-[#08549c] font-bold">Default Sizing Units</h2>
//           <button className="bg-[#08549c] text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
//             Clear All
//           </button>
//         </div>

//         <div className="space-y-4 text-black">
//           {/* User Defined */}
//           <div className="flex justify-between items-center">
//             <label>User Defined:</label>
//             <input type="checkbox" />
//           </div>

//           {/* Valve Type */}
//           <div className="flex justify-between items-center">
//   <label className="mr-4 ">Valve Type:</label>
//   <div className="w-40">
//     <EditableSelect
//       options={valveData.map((item) => item.name)}
//       placeholder="Select Valve Type"
//       listId="valveType"
//     />
//   </div>
// </div>

//           {/* Required Safety Factor */}
//           <div className="flex justify-between items-center">
//             <label>Required Safety Factor:</label>
//             <input
//               type="text"
//               defaultValue="1.25"
//               className="bg-yellow-100 border px-2 py-1 w-20 text-center rounded"
//             />
//           </div>
//           <p className="text-xs text-gray-500 -mt-3">
//             (Example: 1.)
//           </p>

//           {/* Stem Diameter */}
//           <div>
//             <p className="font-bold text-[#08549c] mb-2">Stem Diameter:</p>
//             <div className="flex justify-between items-center">
//               <div className="flex gap-4">
//                 <label className="flex items-center gap-1">
//                   <input type="radio" name="stemUnit" />
//                   Inch
//                 </label>
//                 <label className="flex items-center gap-1">
//                   <input type="radio" name="stemUnit" defaultChecked />
//                   Metric
//                 </label>
//               </div>
//               <input
//                 type="text"
//                 className="border rounded px-2 py-1 w-20 text-center"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Top Right: Actuator Selector */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <ActuatorSelector />
//       </div>

//       {/* Bottom Left: ThirdComp */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <ThirdComp />
//       </div>

//       {/* Bottom Right: Image */}
//       <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
//         <img
//           src={actuatorImage}
//           alt="Actuator"
//           className="object-contain max-h-[300px] w-auto h-auto"
//         />
//       </div>
//     </div>
//   );
// }
