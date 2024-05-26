import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../../components/PageNav/PageNav";
import { useAuth } from "../../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthiticated } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) 
      login(email,password);
  }
  useEffect(function() {
    if(isAuthiticated) navigate("/app" ,{replace:true})
  },[isAuthiticated,navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <Button type="primary">login</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
