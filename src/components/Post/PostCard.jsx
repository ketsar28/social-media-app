import {
  Avatar,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
// import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  likePostsAction,
} from "../../Redux/Post/post.action";
import { isLikedByUser } from "../../utils/isLikedByUser";

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { post, auth } = useSelector((store) => store);

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  const handleCreateComment = (content) => {
    const request = {
      postId: item.id,
      data: {
        content,
      },
    };
    dispatch(createCommentAction(request));
  };
  console.log("PostCard --- letter", auth.user.firstName.charAt(0));

  console.log("item post card ---", item);
  const handleLikePost = () => {
    dispatch(likePostsAction(item.id));
  };

  console.log("isLikedByUser", isLikedByUser(auth.user.id, item));
  return (
    <Card className="">
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName + " " + item.user.lastName}
        subheader={item.user.email}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
      />
      {item.image && (
        <CardMedia
          component="img"
          className="w-full object-cover max-h-[30rem] object-top"
          image={item.image}
          alt="image"
        />
      )}
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign={"justify"}
        >
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="flex justify-between">
        <div>
          <IconButton aria-label="add to favorites" onClick={handleLikePost}>
            {isLikedByUser(auth.user.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton aria-label="share">{<ShareIcon />}</IconButton>
          <IconButton aria-label="chat" onClick={handleShowComment}>
            {<ChatIcon />}
          </IconButton>
        </div>
        <div className="">
          <IconButton aria-label="bookmark">
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      {showComments && (
        <section>
          <div className="flex mx-3 my-5 items-center space-x-5">
            <Avatar sx={{ height: "2rem", width: "2rem", fontSize: "8rem" }}>
              C
            </Avatar>
            <input
              type="text"
              className="w-full outline-none bg-transparent border border-slate-600 rounded-full px-5 py-2"
              placeholder="write yout comment..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                  console.log("enter pressed...", e.target.value);
                }
              }}
            />
          </div>
          <Divider />
          <div className="mx-3 my-5 text-xs space-y-2">
            {/* <div className="flex justify-between items-center"> */}
            {item.comments?.map((comment) => (
              <div className="flex items-center space-x-5">
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: "8rem" }}
                >
                  {comment.user.firstName}
                </Avatar>
                <p>{comment.content}</p>
              </div>
            ))}
            {/* </div> */}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
