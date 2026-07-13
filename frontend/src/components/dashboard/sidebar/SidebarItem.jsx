import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, path, icon: Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
          isActive
            ? "bg-indigo-500 text-white shadow-sm"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{name}</span>
    </NavLink>
  );
};

export default SidebarItem;