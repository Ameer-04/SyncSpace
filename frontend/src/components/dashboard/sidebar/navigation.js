import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    MessageSquare,
    Users,
    Calendar,
    Bell,
    Settings,
} from "lucide-react";

export const navigation = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Projects",
        path: "/projects",
        icon: FolderKanban,
    },
    {
        name: "Tasks",
        path: "/tasks",
        icon: CheckSquare,
    },
    {
        name: "Messages",
        path: "/messages",
        icon: MessageSquare,
    },
    {
        name: "Teams",
        path: "/teams",
        icon: Users,
    },
    {
        name: "Calendar",
        path: "/calendar",
        icon: Calendar,
    },
    {
        name: "Notifications",
        path: "/notifications",
        icon: Bell,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];