import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import styles from "./list.module.css"

function List({product}) {
 console.log(product)
  return (
    <>
    <div>
    
       <div>
         {/* <p>{name}</p>
          <p>{price}</p>
          <p>{quantity}</p>
          <p>{id}</p> */}
          <p
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <FiEdit   className={styles.edit}
              
            />
            <MdDeleteOutline  className={styles.search}
             
            />
          </p>
        </div>
      
    </div>
    </>
  );
}

export default List;
