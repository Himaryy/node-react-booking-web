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
}

export interface AuthContextType {
  user: User | null;
  // hasToken: () => boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
