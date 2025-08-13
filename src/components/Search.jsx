import { useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import api from "../service/config";

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
        style={{
          width: "80%",
          marginRight: "134px",
          marginTop: "20px",
          height: "40px",
          border: "1px solid #E4E4E4",
          borderRadius: "10px",
          outline: "none",
        }}
      />
      <span>
        <RiSearchEyeLine
          style={{
            fontSize: "16px",
            cursor: "pointer",
            position: "absolute",
            top: "1.35rem",
            left: "13rem",
            backgroundColor: "#55a3f0",
            width: "4rem",
            height: "2.5rem",
            borderRadius: "10px",
            color: "#fff",
          }}
          onClick={serachHandeler}
        />
      </span>
    </div>
  );
}

export default Search;
