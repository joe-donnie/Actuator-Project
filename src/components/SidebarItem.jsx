// Sidebar Item Component
function SidebarItem({ icon, label, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 px-3 py-2 rounded cursor-pointer text-sm ${
        isActive ? "bg-gray-200 text-gray-700" : "text-gray-500"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default SidebarItem;