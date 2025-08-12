import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import styles from "./list.module.css"
import api from "../service/config";

function List({product,setRefreshList}) {


  const deleteHandeler = (id)=>{
api.delete(`/products/${id}`).then(res=>res)
setRefreshList(true)
  }

  return (
    <tr>
    <td>{product.name}</td>
    <td>{product.quantity}</td>
    <td>{product.price}</td>
    <td>{product.id}</td>
    <td style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <FiEdit className={styles.edit} />
      <MdDeleteOutline className={styles.search}  onClick={()=> deleteHandeler(product.id)}/>
    </td>
  </tr>
  );
}

export default List;
