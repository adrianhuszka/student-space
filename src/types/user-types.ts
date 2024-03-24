const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "USERNAME", uid: "username", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "ROLES", uid: "realmRoles" },
  { name: "GROUPS", uid: "groups" },
  { name: "BIRTHDATE", uid: "birthdate", sortable: true },
  { name: "PHONENUMBER", uid: "attributes" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "enabled", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "true" },
  { name: "Disabled", uid: "false" },
];

type RealmRole = {
  id: string;
  name: string;
  description: string;
  composite: boolean;
};

type Group = {
  id: string;
  name: string;
  path: string;
};

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  realmRoles: RealmRole[];
  groups: Group[];
  birthdate: string;
  attributes: {
    profile_picture: string[];
    phoneNumber: string[];
  };
  enabled: boolean;
};

export { columns, statusOptions };
export type { User };

/*
{
        "id": "deffabfa-a9ec-413a-9837-8705e5552e02",
        "username": "admin",
        "enabled": true,
        "name": "Main Admin",
        "email": "admin@studentspace.com",
        "attributes": {
            "phoneNumber": [
                "067577575"
            ],
            "profile_picture": [
                "http://138.3.248.186:8080/api/v1/user/prifilepics/admin"
            ]
        },
        "realmRoles": [
            {
                "id": "6c83fb6d-6466-405e-8974-2e4a6c177a02",
                "name": "ADMIN",
                "description": "",
                "composite": false
            },
            {
                "id": "8c9d7011-c2ac-4e0e-bb45-f8ed85e5c8fa",
                "name": "default-roles-thesis",
                "description": "${role_default-roles}",
                "composite": true
            }
        ],
        "groups": [
            {
                "id": "177eac8d-9cbb-4b32-983a-3009dc1b032a",
                "name": "Teachers",
                "path": "/Teachers"
            }
        ]
    },
  */
