import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = { user: null, isAuthiticated: false };
function reducer(currState, action) {
  switch (action.type) {
    case "login":
      return { ...currState, user: action.payload, isAuthiticated: true };
    case "logout":
      return { ...currState, user: null, isAuthiticated: false };

    default:
      throw new Error("not dispatching");
  }
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function AuthProvider({ children }) {
  const [{ user, isAuthiticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if(email===FAKE_USER.email && password === FAKE_USER.password)
        dispatch({type:"login",payload:FAKE_USER})
  }
  function logout() {
    dispatch({type:"logout"})
  }

  return (
    <>
      <AuthContext.Provider value={{user,isAuthiticated,login,logout}}>{children}</AuthContext.Provider>
    </>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("context out of provider");
  return context;
}

export { AuthProvider, useAuth };
