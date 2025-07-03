import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import PartDecode from "../pages/PartDecode";
import S54sensor from "../pages/S54sensor";
import S5Xmonitor from "../pages/S5Xmonitor";
import ActuatorSizing from "../pages/ActuatorSizing";


import Configuration from "../pages/S98Part.jsx";
import ValuePage from "../pages/ValuePage.jsx";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");

  // Example dashboard data, replace this with the real data you want to pass
  const dashboardData = {
    example: "This is dashboard data",
    // ...other data
  };

  const renderView = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Actuator Sizing":
        // Pass setActiveTab and dashboardData as props
        return (
          <ActuatorSizing
            setActiveTab={setActiveTab}
            dashboardData={dashboardData}
          />
        );
      case "S98 Part#":
        return <Configuration />;
      case "Part# Decode":
        return <PartDecode />;
      case "SS4 Sensor":
        return <S54sensor />;
      case "SSX Monitor":
        return <S5Xmonitor />;
      case "Value page":
        return <ValuePage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* Main Content Area */}
      <div className="flex-1 ">
        <header className="shadow-sm AdminHeader">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">{activeTab}</h1>
          </div>
        </header>
        <main >{renderView()}</main>
      </div>
    </div>
  );
};

export default Dashboard;