import DashboardLayout from "../layout/DashboardLayout";
import StatsCard from "../components/dashboard/stats/StatsCard";
import WelcomeBanner from "../components/dashboard/welcome/WelcomeBanner";
import RecentProjects from "../components/dashboard/projects/RecentProjects";
import OnlineMembers from "../components/dashboard/OnlineMembers/OnlineMembers";
import UpcomingDeadlines from "../components/dashboard/upcomingdeadlines/UpcomingDeadlines";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <WelcomeBanner user={user} />
                <StatsCard projects={12} tasks={48} messages={8} members={5} />
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
                    <RecentProjects />
                    <div className="space-y-8">
                        <OnlineMembers />
                        <UpcomingDeadlines />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;