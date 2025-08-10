import { Link } from "react-router-dom";
import styles from "./register.module.css";
import { IoLogoFirebase } from "react-icons/io5";

function Register() {
  return (
    <>
      <h1 className={styles.p}>به سایت ما خوش آمدین</h1>
      <p className={styles.p}> ثبت نام در سایت</p>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.logo}>
            <IoLogoFirebase color="#55A3F0" fontSize="50px"/>
          </div>
          <p>فرم ثبت نام </p>
          <input type="text" placeholder="نام کاربری" />
          <input type="password" placeholder="رمز عبور" />
          <input type="password" placeholder="تکرار رمز عبور" />
          <button type="submite">ثبت نام</button>
          <Link to="/login"  className={styles.link}> حساب کاربری دارید؟</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
