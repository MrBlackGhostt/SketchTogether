export interface iconsProps {
  width: string;
  height: string;
}

export interface ItemSelectContextProps {
  itemSelect: "rectangle" | "circle" | "pointer" | null;
  setItemSelect: (item: "rectangle" | "circle" | "pointer" | null) => void;
}

export interface SignUpProps {
  username: string;
  email: string;
  password: string;
}
export interface SignInProps {
  email: string;
  password: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  userData: { username: string };
  error: string;
  accountCreated: boolean;
  SignUp: (item: SignUpProps) => void;
  SignIn: (item: SignInProps) => void;
}
