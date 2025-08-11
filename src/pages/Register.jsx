import { Link } from "react-router-dom";
import styles from "./register.module.css";
import { IoLogoFirebase } from "react-icons/io5";

import api from "../service/config";
import { useState } from "react";

function Register() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [enterPasswordAgain, setEnterPasswordAgain] = useState("");
  const [res, setRes] = useState("");
  

  const registerHandeler = () => {
    if (password !== enterPasswordAgain) return;

    api
      .post("/auth/register", {
        username: username,
        password: password,
      })
      .then((res) => setRes(res.message));
  };

  return (
    <>
    {!!res && <h1>{res}</h1>}
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
            type="text"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="تکرار رمز عبور"
            value={enterPasswordAgain}
            onChange={(e) => setEnterPasswordAgain(e.target.value)}
          />
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
