// admin dashboard

import { FiActivity, FiBell, FiBook, FiGrid, FiHeart, FiLayers, FiLink, FiMessageSquare, FiSettings, FiUsers, FiVideo, FiFeather, FiFileText } from "react-icons/fi";

type SidebarKey = keyof typeof AdminSidebar;

export const AdminSidebar = {
  Dashboard: "Dashboard",
  Users: "Users",
  Courses: "Courses",
  Lessons: "Lessons",
  Vocabulary: "Vocabulary",
  Flashcards: "Flashcards",
  Notifications: "Notifications",
  HealthyFactory: "Healthy Factory",
  Reports: "Reports",
  Settings: "Settings",
  Integrations: "Integrations",
  UserFeedback: "User Feedback",
  SystemMonitoring: "System Monitoring",
} as const;
export const getIconByKey = (key: SidebarKey) => {
  const icons = {
    Dashboard: FiGrid,
    Users: FiUsers,
    Courses: FiBook,
    Lessons: FiVideo,
    Vocabulary: FiFeather,
    Flashcards: FiLayers,
    Notifications: FiBell,
    HealthyFactory: FiHeart,
    Reports: FiFileText,
    Settings: FiSettings,
    Integrations: FiLink,
    UserFeedback: FiMessageSquare,
    SystemMonitoring: FiActivity,
  };

  return icons[key];
};
