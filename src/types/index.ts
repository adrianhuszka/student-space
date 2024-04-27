import { Folder, Note, TaskSquare, TextBlock, TickSquare } from "iconic-react";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type CustomJWT = JWT & {
  [key: string]: any;
};

type ad = Omit<Session, "user">;

export type CustomSession = Omit<Session, "user"> & {
  [key: string]: any;
};

export type CustomUser = User & {
  [key: string]: any;
};

export const getColorForType = (
  type: SceneElement["type"]
): SceneElement["color"] => {
  switch (type) {
    case "NEWS":
      return "primary";
    case "FORUM":
      return "success";
    case "TEST":
      return "danger";
    case "TASK":
      return "warning";
    case "DOCUMENTS":
      return "secondary";
    default:
      return undefined;
  }
};

export type SceneElement = {
  id: string;
  name: string;
  type: "NEWS" | "FORUM" | "TEST" | "TASK" | "DOCUMENTS";
  color:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  unreadCount: number;
};

export type Scene = {
  id?: string;
  name: string;
  code?: string;
  description?: string;
  image?: string;
  items?: SceneElement[];
  createdAt?: string;
  updatedAt?: string;
};
