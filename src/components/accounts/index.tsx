"use client";

import React from "react";
import AccountTableWrapper from "../table/user/table";

export const Accounts = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="max-w-[95rem] mx-auto w-full px-1 md:px-0">
        <AccountTableWrapper />
      </div>
    </div>
  );
};
