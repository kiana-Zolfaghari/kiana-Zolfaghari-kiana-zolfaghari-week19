import { useState } from "react";
import { CiSearch } from "../../node_modules/react-icons/ci";
import api from "../service/config";
import styles from "./Search.module.css";
function Search({ setList }) {
  const [value, setVlue] = useState("");

  const serachHandeler = () => {
    api
      .get(`/products?page=1&limit=10&name=${value}`)
      .then((res) => setList(res.data.data));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="جست و جو..."
        value={value}
        onChange={(e) => setVlue(e.target.value)}
        className={styles.input}
      />
      <span>
        <CiSearch className={styles.icon} onClick={serachHandeler} />
      </span>
    </div>
  );
}

export default Search;
