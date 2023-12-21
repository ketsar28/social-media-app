import React from "react";
import { NavigationMenu } from "./SidebarNavigation";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { store } from "../../Redux/store";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigation = (item) => {
    console.log("handleNavigation called with item:", item);
    switch (item.name) {
      case "Profile":
        navigate(`${item.path}/${auth.user?.id}`);
        break;
      case "Home":
        navigate(`${item.path}`);
        break;
      case "Reels":
        navigate(`${item.path}`);
        break;
      case "Create Reels":
        navigate(`${item.path}`);
        break;
      case "Message":
        navigate(`${item.path}`);
        break;

      default:
        navigate(`/`);
        break;
    }
  };

  return (
    <Card className="h-screen card flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5 ">
        <div className="flex items-center">
          <span className="font-bold text-xl logo text-green-600">
            Aaw Social
          </span>
        </div>
        <div className="space-y-8">
          {NavigationMenu.map((item) => (
            <div
              onClick={() => handleNavigation(item)}
              className="flex items-center space-x-3 cursor-pointer"
            >
              {item.icon}
              <p className="text-xl">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <Divider />
        <div className="flex items-center justify-between pt-5 pl-5">
          <div className="flex items-center space-x-3">
            <Avatar
              src="https://plus.unsplash.com/premium_photo-1684175656154-ac52b3cc2c60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"
              className="flex items-center flex-col cursor-pointer ring-2 ring-green-800"
            />
            <div className="">
              <p className="font-bold text-lg text-green-600">
                {auth.user?.firstName + " " + auth.user?.lastName}
              </p>
              <p className="opacity-70 text-sm">
                @
                {auth.user?.firstName.toLowerCase() +
                  "_" +
                  auth.user?.lastName.toLowerCase()}
              </p>
            </div>
          </div>

          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon color="success" />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
