import { api } from "../../config/api";
import * as actionType from "./message.actionType";

export const createMessage = (requestData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(
      `/messages/chat/${requestData.message.chatId}`,
      requestData.message
    );
    requestData.sendMessageToServer(data)
    console.log("created message ---", data);
    dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error created message ---", error);
    dispatch({ type: actionType.CREATE_MESSAGE_FAILURE, payload: error });
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post(`/chats/user`, chat);
    console.log("created chat ---", data);
    dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("error created chat ---", error);
    dispatch({ type: actionType.CREATE_CHAT_FAILURE, payload: error });
  }
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: actionType.GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await api.get(`/chats`);
    console.log("get all chats ---", data);
    dispatch({ type: actionType.GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error get all chats ---", error);
    dispatch({ type: actionType.GET_ALL_CHATS_FAILURE, payload: error });
  }
};
