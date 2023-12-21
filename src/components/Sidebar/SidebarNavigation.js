import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import ExploreIcon from "@mui/icons-material/Explore";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const NavigationMenu = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Reels",
    path: "/reels",
    icon: <ExploreIcon />,
  },

  {
    name: "Create Reels",
    path: "/create-reels",
    icon: <ControlPointIcon />,
  },

  {
    name: "Notifications",
    path: "/notifications",
    icon: <NotificationsIcon />,
  },

  {
    name: "Message",
    path: "/message",
    icon: <MessageIcon />,
  },

  {
    name: "Lists",
    path: "/",
    icon: <ListAltIcon />,
  },

  {
    name: "Comunities",
    path: "/",
    icon: <GroupIcon />,
  },

  {
    name: "Profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
];
