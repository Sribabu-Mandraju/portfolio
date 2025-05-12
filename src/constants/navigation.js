import {
  FaTableCells,
  FaChartColumn,
  FaFolderOpen,
  FaClipboard,
  FaGear,
  FaChartPie,
  FaFileLines,
  FaClock,
  FaFolderPlus,
  FaBoxArchive,
  FaListCheck,
  FaUsers,
  FaCircleCheck,
  FaShield,
  FaBell,
  FaCreditCard,
  FaFolder,
  FaFlag,
  FaBug,
  FaLock,
  FaCode,
  FaNetworkWired,
} from "react-icons/fa6";

export const menuItems = [
  {
    title: "Dashboard",
    icon: FaTableCells,
    path: "/",
  },
  {
    title: "Projects",
    icon: FaFolder,
    path: "/projects",
    subItems: [
      { title: "All Projects", path: "/projects", icon: FaFolderOpen },
      { title: "Active", path: "/projects/active", icon: FaFolderPlus },
      { title: "Archived", path: "/projects/archived", icon: FaBoxArchive },
    ],
  },
  {
    title: "Writeups",
    icon: FaFlag,
    path: "/writeups",
    subItems: [
      { title: "Web3 Security", path: "/writeups/web3-security", icon: FaBug },
      { title: "Cryptography", path: "/writeups/crypto", icon: FaLock },
    ],
  },
  {
    title: "Tasks",
    icon: FaClipboard,
    path: "/tasks",
    subItems: [
      { title: "My Tasks", path: "/tasks", icon: FaListCheck },
      { title: "Assigned", path: "/tasks/assigned", icon: FaUsers },
      { title: "Completed", path: "/tasks/completed", icon: FaCircleCheck },
    ],
  },
  {
    title: "Settings",
    icon: FaGear,
    path: "/settings",
    subItems: [
      { title: "General", path: "/settings", icon: FaGear },
      { title: "Security", path: "/settings/security", icon: FaShield },
      { title: "Notifications", path: "/settings/notifications", icon: FaBell },
      { title: "Billing", path: "/settings/billing", icon: FaCreditCard },
    ],
  },
];
