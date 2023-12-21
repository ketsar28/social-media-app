import React from "react";

import { Avatar, Button, CardHeader } from "@mui/material";
import { green } from "@mui/material/colors";
const PopularUserCard = () => {

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Foto_Jerome_Polin.png"
            sx={{ bgcolor: green[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          <Button size="xs">
            Follow
          </Button>
        }
        title="Jerome Polin"
        subheader="@jeromepolin"
      />
    </div>
  );
};

export default PopularUserCard;
