import { FormEvent } from "react";
import { User } from "../table/user/data";
import AccountTableWrapper from "../table/user/table";
import { getAccessToken } from "@/utils/sessionTokenAccessor";

const fetchUsers = async () => {
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/administration/users?search=&page=0&size=10`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 30,
      },
    }
  ).catch((error) => console.error(error));

  const result = await response?.json();
  return result;
};

export const Accounts = async () => {
  const users: User[] | undefined = await fetchUsers();

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="max-w-[95rem] mx-auto w-full px-1 md:px-0">
        <AccountTableWrapper users={users ?? []} />
      </div>
    </div>
  );
};
