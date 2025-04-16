export type UserAction =
  | {
      type: "INITIAL_FETCH_FROM_COOKIE";
      payload: {
        state: any;
      };
    }
  | {
      type: "LOGIN";
      payload: {
        data: {
          userID: string;
          email: string;
          name: string;
          projects: Array<string>;
        };
      };
    }
  | {
      type: "REFRESH_DASHBOARD_DATA";
    }
  | {
      type: "UPDATE_USER_DATA";
      payload: {
        updatedState: {
          loginStatus: boolean;
          userData: {
            userID: string;
            email: string;
            name: string;
            projects: Array<string>;
          };
        };
      };
    }
  | {
      type: "LOGOUT";
    };
