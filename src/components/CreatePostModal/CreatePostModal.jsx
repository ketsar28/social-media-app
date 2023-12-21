import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  createPostAction,
} from "../../Redux/Post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: ".6rem",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const CreatePostModal = ({ handleClose, open }) => {
  //   const formik = useFormik();
  const [imageSelected, setImageSelected] = useState();
  const [videoSelected, setVideoSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  console.log("auth CreatePostModal :", auth);

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    setImageSelected(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  };
  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
    setVideoSelected(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values) => {
      console.log("formik values", values);
      dispatch(createPostAction(values));
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex space-x-4 items-center">
                <Avatar />
                <div className="">
                  <p className="text-lg font-bold">
                    {auth.user.firstName + " " + auth.user.lastName}
                  </p>
                  <p className="text-sm">
                    @
                    {auth.user.firstName.toLowerCase() +
                      "_" +
                      auth.user.lastName.toLowerCase()}
                  </p>
                </div>
              </div>
              <textarea
                className="outline-none bg-transparent rounded-md border-2 border-slate-600 w-full mt-5 p-2"
                name="caption"
                id=""
                placeholder="write caption..."
                rows="4"
                onChange={formik.handleChange}
                value={formik.values.caption}
              />
              <div className="flex space-x-5 items-center mt-5 ">
                <div>
                  <input
                    type="file"
                    name="image"
                    id="image-input"
                    accept="image/*"
                    onChange={handleSelectImage}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </label>
                  <span>Image</span>

                  <input
                    type="file"
                    name="video"
                    id="video-input"
                    accept="video/*"
                    onChange={handleSelectVideo}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary">
                      <VideoCallIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>

                  {imageSelected && (
                    <div>
                      <img
                        src={imageSelected}
                        alt={"selected"}
                        className="h-[10rem]"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end w-full ">
                <Button
                  sx={{ borderRadius: "2rem" }}
                  type="submit"
                  variant="contained"
                >
                  Post
                </Button>
              </div>
            </div>
          </form>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
