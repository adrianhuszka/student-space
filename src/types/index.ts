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

export type SceneElement = {
  id: string;
  name: "news" | "forum" | "test" | "task" | "document";
  icon: ReactNode;
  color:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  unread: number;
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
