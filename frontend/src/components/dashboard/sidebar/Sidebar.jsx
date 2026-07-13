import { navigation } from "./navigation";
import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-[280px] flex-col bg-slate-900 px-5 py-6">
      {/* Logo */}

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          CollabHub
        </h1>

        <p className="text-sm text-slate-400">
          Work together.
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => (
          <SidebarItem
            key={item.path}
            name={item.name}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </nav>

      {/* Profile */}

      <SidebarProfile />
    </aside>
  );
};

export default Sidebar;