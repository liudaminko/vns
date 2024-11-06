export type UserRole = "student" | "editor" | "admin";

export interface User {
  id: number;
  name: string;
  role: UserRole;
  profilePic?: string;
}

export const mockUsers: User[] = [
  { id: 1, name: "Міньковець Людмила", role: "student", profilePic: "" },
  {
    id: 2,
    name: "Олексій Петренко",
    role: "editor",
    profilePic: "",
  },
  { id: 3, name: "Іван Сидоренко", role: "admin", profilePic: "" },
];
