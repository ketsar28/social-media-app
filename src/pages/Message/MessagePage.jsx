import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUserChat from "../../components/SearchUserChat/SearchUserChat";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stom from "stompjs";

const MessagePage = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Check if the token is not present in local storage, then redirect to the login page
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      dispatch(getAllChats());
    }
  }, [dispatch, navigate]);

  // console.log("chats ----", message.chats);
  // console.log("chats message MessagePage ---", message.chats.messages);

  const handleSelectImage = async (e) => {
    setLoading(true);
    console.log("handleSelectImage");
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message, sendMessageToServer }));
  };

  // useEffect(() => {
  //   setMessages([...messages, message.message]);
  // }, [message.message]);

  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    const sock = new SockJS("http://localhost:8181/ws");
    const stomp = Stom.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);
  }, []);

  const onConnect = () => {
    console.log("websocket connected...");
  };

  const onError = (error) => {
    console.log("websocket occured error...", error);
  };

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      console.log("yes its coming inside");
      const subcription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceive
      );
    }
  });

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log("message receive from web socket", receivedMessage);
    setMessages([...message, receivedMessage]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid item xs={3} className="px-5">
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div
                className="flex space-x-4 items-center py-5 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <WestIcon />
                <div className="h1 text-xl font-bold">Home</div>
              </div>

              <div className="h-[83vh] ">
                <div className="">
                  <SearchUserChat />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollBar shadow-md shadow-slate-600">
                  {message.chats.map((item) => {
                    return (
                      <div
                        className="cursor-pointer"
                        key={item.id}
                        onClick={() => {
                          setCurrentChat(item);
                          setMessages(item.messages);
                        }}
                      >
                        <UserChatCard chat={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={9} className="h-full ">
          {currentChat ? (
            <div className="">
              <div className="flex justify-between items-center border-1 p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400" />
                  <p className="font-semibold">
                    {auth.user?.id === currentChat.users[0]?.id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon color="success" />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon color="success" />
                  </IconButton>
                </div>
              </div>
              <div
                ref={chatContainerRef}
                className="hideScrollBar overflow-y-scroll h-[78vh] px-10 space-y-5 py-10"
              >
                {messages.map((item) => (
                  <ChatMessage userMessage={item} />
                ))}
              </div>
              <div className="sticky -bottom-2 border-1 ">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt={selectedImage}
                    className="w-[5rem] h-[5rem] object-cover px-2"
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                        setSelectedImage("");
                      }
                    }}
                    type="text"
                    className="bg-transparent border border-slate-600 rounded-full w-[90%] px-5 py-3 "
                    placeholder="Type message here..."
                  />
                  <div className="">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input" className="cursor-pointer">
                      <AddPhotoAlternateIcon color="primary" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 flex justify-center h-full items-center flex-col">
              <ChatBubbleOutlineIcon sx={{ fontSize: "12rem" }} />
              <p className="text-xl font-semibold">No Chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  );
};

export default MessagePage;
