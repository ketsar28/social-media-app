import React from "react";

const SearchUser = () => {
  return (
    <div>
      <div className="p-5 mt-5">
        <div className="justify-center flex gap-3">
          <input
            type="text"
            readOnly
            className="outline-none border-2 border-[#bdbdbd] rounded-full bg-transparent px-5 py-2 w-full "
            placeholder="Search user..."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
