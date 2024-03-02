import { Group } from "../table/group/data";
import GroupTableWrapper from "../table/group/table";
import { getAccessToken } from "@/utils/sessionTokenAccessor";

const fetchGroups = async () => {
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/administration/groups`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 0,
      },
    }
  ).catch((error) => console.error(error));

  const result = await response?.json();
  return result;
};

export const Groups = async () => {
  const groups: Group[] | undefined = await fetchGroups();
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Groups</h3>
      <div className="max-w-[95rem] mx-auto w-full px-1 md:px-0">
        <GroupTableWrapper groups={groups ?? []} />
      </div>
    </div>
  );
};
