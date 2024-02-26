const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PATH", uid: "path", sortable: true },
  { name: "ROLES", uid: "roles" },
  { name: "MEMBERS", uid: "members" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Disabled", uid: "disabled" },
];

const groups = [
  {
    id: 1,
    name: "ADMINISTRATION",
    roles: ["Admin", "Teacher"],
    path: "/",
    status: "active",
    members: 5,
  },
];

export { columns, groups, statusOptions };
