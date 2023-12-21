// import React from "react";
// import { useSelector } from "react-redux";

// const ChatMessage = ({ userMessage }) => {
//   const { message, auth } = useSelector((store) => store);
//   const isResponseUserMessage = auth.user?.id === userMessage.user?.id;
//   console.log("auth user ChatMessage ---", auth.user?.id);
//   console.log("userMessage user ChatMessage ---", userMessage.user?.id);
//   return (
//     <div
//       className={`flex ${
//         isResponseUserMessage ? "justify-start" : "justify-end"
//       } text-white`}
//     >
//       <div
//         className={`p-1 ${
//           userMessage.image ? "rounded-xl" : "px-5 rounded-full"
//         } bg-[#191c29] `}
//       >
//         {userMessage.image && (
//           <img
//             src={userMessage.image}
//             alt={userMessage.image}
//             className="w-[12rem] h-[17rem] object-cover rounded-xl"
//           />
//         )}
//         <p className={`${true ? "py-2" : "py-1"}`}>{userMessage.content}</p>
//       </div>
//     </div>
//   );
// };

// export default ChatMessage;

import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ userMessage }) => {
  const { message, auth } = useSelector((store) => store);
  const isResponseUserMessage = auth.user?.id === userMessage.user?.id;
  console.log("auth user ChatMessage ---", auth.user?.id);
  console.log("userMessage user ChatMessage ---", userMessage.user?.id);
  return (
    <div
      className={`flex ${
        !isResponseUserMessage ? "justify-start" : "justify-end"
      } text-white`}
    >
      <div
        className={`p-1 ${
          userMessage.image ? "rounded-xl" : "px-5 rounded-full"
        } bg-[#191c29] `}
        style={{
          maxWidth: userMessage.image ? "12rem" : "100%", // Set max width for the container
        }}
      >
        {userMessage.image && (
          <img
            src={userMessage.image}
            alt={userMessage.image}
            className={`w-full h-auto object-cover rounded-xl ${
              userMessage.image.startsWith("data:") ? "mx-auto" : ""
            }`}
            style={{
              maxHeight: "17rem", // Set max height for landscape images
            }}
          />
        )}
        <p
          className={`${true ? "py-2" : "py-1"}`}
          style={{
            wordWrap: "break-word", // Ensure long text wraps within the container
          }}
        >
          {userMessage.content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
