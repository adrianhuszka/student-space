const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PATH", uid: "path", sortable: true },
  { name: "ROLES", uid: "realmRoles" },
  { name: "MEMBERS", uid: "members" },
  { name: "SUBGROUPS", uid: "subGroupCount" },
  { name: "ACTIONS", uid: "actions" },
];

type Group = {
  id: string;
  name: string;
  realmRoles: string[];
  path: string;
  members: number;
  subGroupCount: number;
};

export { columns };
export type { Group };
