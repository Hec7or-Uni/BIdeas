import { FiMonitor, FiUser, FiUsers, FiBriefcase } from "react-icons/fi"

export const cat1 = [
  {
    id: 1,
    url: "/home",
    icon: <FiMonitor className={`w-full h-full dark:text-white`} />,
    text: "home",
  },
  {
    id: 2,
    url: "/my-profile",
    icon: <FiUser className={`w-full h-full dark:text-white`} />,
    text: "My Profile",
  },
  {
    id: 3,
    url: "/my-team",
    icon: <FiUsers className={`w-full h-full dark:text-white`} />,
    text: "My Team",
  },
]

export const cat2 = [
  {
    id: 1,
    icon: <FiBriefcase className={`w-full h-full dark:text-white`} />,
    text: "carrers",
    sub: [
      {
        id: 1.1,
        url: "/careers/teams",
        text: "teams",
      },
      {
        id: 1.2,
        url: "/careers/professionals",
        text: "professionals",
      },
    ],
  },
]
