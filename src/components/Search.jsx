import { RiSearchEyeLine } from "react-icons/ri";

function Search() {
  return (
    <div>
      <input
        type="text"
        placeholder="جست و جو..."
        style={{
          width: "90%",
          marginRight: "20px",
          marginTop: "20px",
          height: "40px",
          border: "1px solid #E4E4E4",
          borderRadius: "10px",
          outline: "none",
        }}
      />
      <span>
        <RiSearchEyeLine style={{fontSize:"25px"}}/>
      </span>
    </div>
  );
}

export default Search;
