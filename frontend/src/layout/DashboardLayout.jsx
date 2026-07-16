import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Topbar from "../components/dashboard/topbar/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;