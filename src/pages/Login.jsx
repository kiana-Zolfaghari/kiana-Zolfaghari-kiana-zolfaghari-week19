import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { IoLogoFirebase } from "react-icons/io5";
import { useState } from "react";

import api from "../service/config";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [allert ,setAllert]=useState("")

  const navigate = useNavigate();

  const loginHandeler = () => {
    api
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.massage === "Invalid credentials") {
          setAllert("Invalid username or password")
          return;
        }
        localStorage.setItem("token", `${res.data.token}`);
        navigate("/products");
      });
      localStorage.setItem("username", `${username}`);

  };
  return (
    <>
    <p>{allert}</p>
    
      <h1 className={styles.p}>به سایت ما خوش آمدین</h1>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.logo}>
            <IoLogoFirebase color="#55A3F0" fontSize="50px" />
          </div>
          <p>فرم ورود </p>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            ue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submite" onClick={loginHandeler}>
            ورود
          </button>
          <Link to="/register" className={styles.link}>
            ایجاد حساب کاربری!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
