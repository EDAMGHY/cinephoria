import React, { createContext, ReactNode, useContext, useState } from "react";

const initialState = {
  step: 1,
  state: {
    email: "",
    username: "",
    password: "",
    pinCode: "",
    profilePic: null,
  },
  next: () => {},
  back: () => {},
  updateField: () => {},
  reset: () => {},
};

interface SignupState {
  email: string;
  username: string;
  password: string;
  pinCode: string;
  profilePic: string | null;
}

export interface ISignupContext {
  step: number;
  state: SignupState;
  next: () => void;
  back: () => void;
  reset: () => void;
  updateField: <K extends keyof SignupState>(
    field: K,
    value: SignupState[K]
  ) => void;
}

// 1. Create the Context
export const SignupContext = createContext<ISignupContext>(initialState);

// 2. Create a Provider component
export const SignupProvider = ({ children }: { children: ReactNode }) => {
  // step state, 1–4
  const [step, setStep] = useState(1);

  // signup fields only
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    pinCode: "",
    profilePic: null, // URI or File
  });

  // step management
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // update any signup field
  const updateField = <K extends keyof SignupState>(
    field: K,
    value: SignupState[K]
  ) => setState((d) => ({ ...d, [field]: value }));

  const reset = () => {
    setStep(1);
    setState({
      email: "",
      username: "",
      password: "",
      pinCode: "",
      profilePic: null,
    });
  };

  return (
    <SignupContext.Provider
      value={{
        step,
        next,
        back,
        state,
        updateField,
        reset,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignUp = () => useContext(SignupContext);
