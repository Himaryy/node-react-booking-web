export const FIELD_NAMES = {
  name: "Full name",
  email: "Email",
  password: "Password",
};

export const FIELD_TYPES = {
  name: "Full Name",
  email: "Email",
  password: "Password",
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isLoading: boolean;
  isLoadingAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutAdmin: () => Promise<void>;
}
