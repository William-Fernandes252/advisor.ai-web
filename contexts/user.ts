import type { User } from "@/app/models/users";
import { createContext } from "react";

export const UserContext = createContext<User | null>(null);
