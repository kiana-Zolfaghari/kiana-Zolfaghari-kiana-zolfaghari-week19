import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { IoLogoFirebase } from "react-icons/io5";
import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";
import { FaEye } from "../../node_modules/react-icons/fa";
import { FaEyeSlash } from "../../node_modules/react-icons/fa";

import api from "../service/config";
import { useState, useEffect } from "react";

function Register() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [enterPasswordAgain, setEnterPasswordAgain] = useState("");
  const Navigate = useNavigate();
  const { notification, allert, alertType } = useContext(NotificationContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  useEffect(() => {
    if (allert) {
      const timer = setTimeout(() => {
        notification("", "");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [allert]);

  const registerHandeler = () => {
    if (username === "") {
      notification("err", "وارد کردن نام کابری اجباری است");
      return;
    }
    if (password !== enterPasswordAgain) {
      notification("err", "رمز عبور وارد شده یکسان نمیباشد");
      return;
    }

    api
      .post("/auth/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        res, Navigate("/login");
      })
      .catch((err) => {
        err, notification("err", "این کاربر قبلا ثبت شده");
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
      <p className={styles.p}> ثبت نام در سایت</p>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.logo}>
            <IoLogoFirebase color="#55A3F0" fontSize="50px" />
          </div>
          <p>فرم ثبت نام </p>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            value={password}
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
          <input
            type={showRepeatPassword ? "text" : "password"}
            placeholder="تکرار رمز عبور"
            value={enterPasswordAgain}
            onChange={(e) => setEnterPasswordAgain(e.target.value)}
          />
          {showRepeatPassword ? (
            <FaEyeSlash
              className={styles.FaEyeSlash2}
              onClick={() =>
                setShowRepeatPassword(
                  (showRepeatPassword) => !showRepeatPassword
                )
              }
            />
          ) : (
            <FaEye
              className={styles.FaEye2}
              onClick={() =>
                setShowRepeatPassword(
                  (showRepeatPassword) => !showRepeatPassword
                )
              }
            />
          )}
          <button type="submite" onClick={registerHandeler}>
            ثبت نام
          </button>
          <Link to="/login" className={styles.link}>
            حساب کاربری دارید؟
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
