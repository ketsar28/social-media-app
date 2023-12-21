import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "../PopularUserCard/PopularUserCard";
import { Card } from "@mui/material";

const HomeRight = () => {
  const people = [1, 1, 1, 1];
  return (
    <div className="pr-5">
      <SearchUser />

      <Card className="p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="opacity-70 font-semibold">Suggestion for you</p>
          <p className="text-xs opacity-95 font-semibold">View all</p>
        </div>
        <div className="space-y-1">
          {people.map((person) => (
            <PopularUserCard />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
