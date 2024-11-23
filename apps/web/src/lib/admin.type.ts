// admin dashboard

import {  FiBook, FiGrid, FiLayers, FiSettings, FiUsers, FiVideo, FiFeather, FiFileText, FiTrello } from "react-icons/fi";

type SidebarKey = keyof typeof AdminSidebar;

export const AdminSidebar = {
  Dashboard: "Dashboard",
  Users: "Users",
  Courses: "Courses",
  Lessons: "Lessons",
  Vocabulary: "Vocabulary",
  Grammar: "Grammar",
  Flashcards: "Flashcards",
  // Notifications: "Notifications",
  // HealthyFactory: "Healthy Factory",
  Minitest: "Minitest",
  Settings: "Settings",
  // Integrations: "Integrations",
  // UserFeedback: "User Feedback",
  // SystemMonitoring: "System Monitoring",
} as const;
export const getIconByKey = (key: SidebarKey) => {
  const icons = {
    Dashboard: FiGrid,
    Users: FiUsers,
    Courses: FiBook,
    Lessons: FiVideo,
    Vocabulary: FiFeather,
    Grammar: FiTrello,
    Flashcards: FiLayers,
    // Notifications: FiBell,
    // HealthyFactory: FiHeart,
    Minitest: FiFileText,
    Settings: FiSettings,
    // Integrations: FiLink,
    // UserFeedback: FiMessageSquare,
    // SystemMonitoring: FiActivity,
  };

  return icons[key];
};
