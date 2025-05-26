// /context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthContextType = {
  user: { email: string } | null;
  loading: boolean;
  signUp: (state: IUser) => Promise<void>;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to restore token on mount
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        // TODO: validate token / fetch user profile
        setUser({ email: "you@site.com" });
      }
      setLoading(false);
    });
  }, []);

  const signUp = async (state: IUser) => {
    // TODO: call your API → { token, user }
    // const token = await api.signIn(email, pass);
    // await AsyncStorage.setItem("token", token);
    console.log("call your API to sign up", state);
    setUser({ email: state.email });
  };

  const signIn = async (email: string, pass: string) => {
    // TODO: call your API → { success }
    console.log("call your API to sign up", email, pass);
    // await api.signUp(email, pass);
    // after signUp you usually send a verification email with OTP
    setUser({ email });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
