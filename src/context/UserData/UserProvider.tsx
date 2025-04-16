"use client";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { UserAction } from "./UserAction";
import { getSession, login, logout, updateCookie } from "./AuthLogic";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";

type UserData = {
  userID: string;

  name: string;

  email: string;

  projects: Array<string>;
};

export type UserState = {
  loginStatus: boolean;
  userData: UserData | null;
};

const initialUserState: UserState = {
  loginStatus: false,
  userData: null,
};

const handleDataFetching = async (userId: { userId: string }) => {
  if (!userId) return;
  const resp = await axios.get(
    `${BACKEND_URL}/projects/getProjectsForDashboard/${userId}`,
    HEADER_CONFIG,
  );

  if (resp.data.status === true) {
    return resp.data.data;
  }
};

const UserDataFetch = async (userId: { userId: string }) => {
  if (!userId) return;

  const resp = await axios.get(
    `${BACKEND_URL}/users?userId=${userId.userId}`,
    HEADER_CONFIG,
  );
  if (resp.data.status === true) {
    return resp.data.data;
  }
};

const userReducer = (
  userState: UserState = initialUserState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case "LOGIN":
      const updatedStateAfterLogin: UserState = {
        loginStatus: true,
        userData: action.payload.data,
      };
      login(updatedStateAfterLogin);
      return updatedStateAfterLogin;
    case "LOGOUT":
      logout();
      return {
        loginStatus: false,
        userData: null,
      };
    case "INITIAL_FETCH_FROM_COOKIE":
      return action.payload.state;
    case "UPDATE_USER_DATA":
      return action.payload.updatedState;

    default:
      return userState;
  }
};

export const UserContext = createContext<{
  userState: UserState;
  dispatchUserState: Dispatch<UserAction>;
  handleUserUpdate: () => void;
}>({
  userState: initialUserState,
  dispatchUserState: () => undefined,
  handleUserUpdate: () => {},
});

type SettingsProps = {
  children: React.ReactNode;
};

const UserProvider = (props: SettingsProps) => {
  const [userState, dispatchUserState] = useReducer(
    userReducer,
    initialUserState,
  );

  const handleUserUpdate = async () => {
    if (userState.loginStatus) {
      try {
        const userId = userState?.userData?.userID;
        if (userId) {
          const updatedUserData = await UserDataFetch({ userId });

          if (updatedUserData) {
            const { userID, name, email, projects } = updatedUserData as {
              userID?: string;
              name?: string;
              email?: string;
              projects?: Array<string>;
            };
            if (!userID || !name || !email || !projects) return userState;

            dispatchUserState({
              type: "UPDATE_USER_DATA",
              payload: {
                updatedState: {
                  ...userState,
                  userData: {
                    userID: userID,
                    name: name,
                    email: email,
                    projects: projects,
                  },
                },
              },
            });
            await updateCookie(userState);
          }
        }
      } catch (error) {
        return userState;
      }
    }
  };

  const checkIfCookieExists = async () => {
    const resp = await getSession();

    if (resp) {
      dispatchUserState({
        type: "INITIAL_FETCH_FROM_COOKIE",
        payload: { state: resp.state },
      });
    }
  };

  useEffect(() => {
    checkIfCookieExists();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userState,
        dispatchUserState,
        handleUserUpdate,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser Hook must be used within the User Provider");
  }
  return context;
};

export default UserProvider;
