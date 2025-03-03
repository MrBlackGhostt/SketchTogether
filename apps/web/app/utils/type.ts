export interface iconsProps {
  width: string;
  height: string;
}

export interface Item {
  type: "rectangle" | "circle";
  x: number;
  y: number;
  color?: string | null;
  width?: number;
  height?: number;
  radius?: number;
}

export interface ItemSelectContextProps {
  itemSelect: "rectangle" | "circle" | "pointer" | null;
  setItemSelect: (item: "rectangle" | "circle" | "pointer" | null) => void;
  pickColor: string | null;
  setPickColor: (item: string) => void;
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
  userData: { username: string; userId: string };
  error: string | null;
  accountCreated: boolean;
  SignUp: (item: SignUpProps) => void;
  SignIn: (item: SignInProps) => void;
  SignOut: () => void;
}

export interface RoomContextProps {
  roomId: string | null;
  setRoomId: (item: string) => void;
  JoinRoom: (i: string) => void;
  CreateRoom: (i: string) => void;
  element: Item[];
  error: string | null;
}
