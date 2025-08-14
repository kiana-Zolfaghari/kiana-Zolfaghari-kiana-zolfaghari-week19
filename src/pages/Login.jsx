import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { IoLogoFirebase } from "react-icons/io5";
import { useState, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";
import { FaEye } from "../../node_modules/react-icons/fa";
import { FaEyeSlash } from "../../node_modules/react-icons/fa";
import api from "../service/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { notification, allert, alertType } = useContext(NotificationContext);
  const [massage, setMassage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (allert) {
      const timer = setTimeout(() => {
        notification("", "");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [allert]);

  const navigate = useNavigate();

  const loginHandeler = () => {
    if (username === "") {
      setMassage("نام  کاربری را وارد کنید!");
      return;
    }
    api
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", `${res.data.token}`);
        localStorage.setItem("username", `${username}`);
        navigate("/products");
      })
      .catch((err) => {
        err, notification("err", "نام کاربری یا رمز عبور اشتباه است");
      });
  };
  return (
    <>
      {allert && (
        <p
          className={
            alertType === "success" ? styles.alertSuccess : styles.alertError
          }
        >
          {allert}
        </p>
      )}
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
          {massage && <p className={styles.massage}>{massage}</p>}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            ue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash
              className={styles.FaEyeSlash1}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            />
          ) : (
            <FaEye
              className={styles.FaEye1}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            />
          )}
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
