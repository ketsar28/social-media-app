import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";

const SearchUserChat = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);

  //   console.log("SearchUserChat ---", message);
  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    console.log("handleSearchUser...", auth.searchUser);
    dispatch(searchUserAction(username));
  };
  const handleClick = (id) => {
    dispatch(createChat({userResponseId:id}));
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          type="text"
          className="bg-transparent border-2 border-slate-600 outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search user..."
          onChange={handleSearchUser}
        />
        {username &&
          auth.searchUser.map((item) => (
            <Card
              key={item.id}
              className="absolute w-full z-10 top-[4.5rem] cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={
                  <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" />
                }
                title={item.firstName + " " + item.lastName}
                subheader={item.email}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUserChat;
