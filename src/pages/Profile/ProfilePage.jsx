import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const tabs = [
  { value: "post", label: "Post" },
  { value: "repost", label: "Repost" },
  { value: "saved", label: "Saved" },
  { value: "reels", label: "Reels" },
];

const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedPost = [1, 1, 1, 1];

const ProfilePage = () => {
  const { auth } = useSelector((store) => store);
  const [value, setValue] = useState("post");
  const [open, setOpen] = useState(false);
  const { post } = useSelector((store) => store);

  const handleOpenProfileModal = () => {
    console.log("Opening profile modal");
    setOpen(true);
  };
  console.log("open ---", open);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="py-10 w-[70%]">
      <Card className="rounded-md ">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-xl"
            src="https://images.unsplash.com/photo-1636013912260-a176d5e08408?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"
            alt=""
          />
        </div>
        <div className="flex justify-between items-start px-5 mt-5 h-[5rem]">
          <Avatar
            src="https://plus.unsplash.com/premium_photo-1661914978519-52a11fe159a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZ298ZW58MHx8MHx8fDA%3D"
            sx={{ width: "10rem", height: "10rem" }}
            className="transform -translate-y-24"
          />
          <Button
            sx={{ borderRadius: "20px" }}
            variant="outlined"
            onClick={() => {
              handleOpenProfileModal();
            }}
          >
            {true ? "Edit Profile" : "Follow"}
          </Button>
        </div>
        <div className="px-6 py-3">
          <div className="">
            <p className=" text-xl font-bold">
              {" "}
              {auth.user?.firstName + " " + auth.user?.lastName}
            </p>
            <p className="py-1 opacity-70 text-sm">
              @
              {auth.user?.firstName.toLowerCase() +
                "_" +
                auth.user?.lastName.toLowerCase()}
            </p>
            <p className="opacity-70 text-sm">Full Stack Developer</p>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>30 Post</span>
            <span>3145 Followers</span>
            <span>200 Following</span>
          </div>
          <div className="">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              praesentium alias inventore voluptatum totam, minus deserunt
              doloremque, commodi possimus magnam porro officiis ab. Sequi rerum
              nisi vitae nihil dicta nostrum
            </p>
          </div>
        </div>
        <section className="">
          <Box sx={{ width: "100%", borderColor: "divider", borderBottom: 1 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map(({ value, label }) => (
                <Tab value={value} label={label} />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.map((item) => (
                  <div className="shadow-md shadow-slate-500">
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.map((item) => (
                  <div className="shadow-md shadow-slate-500">
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="space-y-5  flex flex-wrap justify-center my-10">
                {reels.map((item) => (
                  <UserReelCard />
                ))}
              </div>
            ) : (
              <div className="space-y-5 w-[70%] my-10">Repost</div>
            )}
          </div>
        </section>

        <section>
          <ProfileModal open={open} handleClose={handleClose} />
        </section>
      </Card>
    </div>
  );
};

export default ProfilePage;
