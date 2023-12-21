import React from "react";

const UserReelCard = () => {
  return (
    <div className="w-[15rem] px-2">
      <iframe
        className="w-full h-full rounded-xl"
        src="https://www.youtube.com/embed/FpNDFxlkDPA?si=VEByOK1fznIneiUL"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default UserReelCard;
