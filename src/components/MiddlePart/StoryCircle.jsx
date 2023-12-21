import { Avatar } from "@mui/material";
import React from "react";

const StoryCircle = () => {
  return (
    <div>
      <div className="flex items-center mr-5 flex-col cursor-pointer space-y-2">
        <Avatar
          src="https://images.unsplash.com/photo-1698092826352-38667b6ed6f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"
          sx={{ width: "5rem", height: "5rem" }}
        />
        <p className="">Ketsar Ali</p>
      </div>
    </div>
  );
};

export default StoryCircle;
