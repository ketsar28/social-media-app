import { Avatar, Card, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import VideocamIcon from "@mui/icons-material/Videocam";
import StoryCircle from "./StoryCircle";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsAction } from "../../Redux/Post/post.action";
import { store } from "../../Redux/store";
const MiddlePart = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store);
  console.log("post in middle part ---", post);
  const story = [2, 3, 4, 1, 2];
  const posts = [2, 3, 4, 1, 2];
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log("open create post modal...(", openCreatePostModal, ")");
  };

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [post.newComment]);

  return (
    <div className="px-20">
      <section className="rounded-b-md flex items-center p-5">
        <div className="flex items-center mr-5 flex-col cursor-pointer space-y-2">
          <Avatar src="" sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p className="">Add</p>
        </div>
        {story.map((item) => (
          <StoryCircle />
        ))}
      </section>
      <Card className="p-5 mt-5">
        <div className="justify-center flex gap-3">
          <Avatar />
          <input
            type="text"
            readOnly
            className="outline-none border-2 border-[#bdbdbd] rounded-full bg-transparent px-5 w-[90%]"
          />
        </div>
        <div className="flex justify-center mt-5 space-x-10">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>
            <span className="font-semibold">Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span className="font-semibold">Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>
            <span className="font-semibold">Write Article</span>
          </div>
        </div>
      </Card>
      <div className="space-y-5 mt-5">
        {post.posts.map((item) => (
          <PostCard item={item} />
        ))}
      </div>
      <div className="">
        <CreatePostModal
          handleClose={handleCloseCreatePostModal}
          open={openCreatePostModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
