import { Link } from "react-router-dom";
import img from "../assets/404-error.jpg";
import styles from "./pageNotfound.module.css"
function PageNotfound() {
  return (
    <div className={styles.container}>
      <Link  className={styles.back}
        to="/products"
        >
        بازگشت
      </Link>
      <img src={img} alt="404" />
    </div>
  );
}

export default PageNotfound;
