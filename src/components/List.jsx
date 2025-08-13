import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import styles from "./list.module.css";
import api from "../service/config";
import { useState } from "react";
import image from "../assets/Close.png";
import { useContext } from "react";
import { ProductContext } from "../context/userContext";
import { FiLoader } from "react-icons/fi";

function List({ product, setRefreshList, setShowAddDialog }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    setName,
    setPrice,
    setQuantity,
    setIsEdit,
    setId,
    setIds,
  } = useContext(ProductContext);



  const deleteHandeler = (id) => {
    api.delete(`/products/${id}`).then((res) => res);
    setRefreshList(true);
    setShowDeleteDialog(false);
  };

  const showEdit = (id) => {
    setShowAddDialog(true);
    setIsEdit(true);
    api.get(`/products/${id}`).then((res) => {
      setName(res.data.name),
        setPrice(res.data.price),
        setQuantity(res.data.quantity);
      setId(id);
    });
  };


  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={(e) => {
            const checked = e.target.checked;
            setIds((ids) => {
              if (checked) {
                return [...ids, product.id];
              } else {
                return ids.filter((id) => id !== product.id);
              }
            });
          }}
        />
        {product.name}
      </td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{product.id}</td>
      <td style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <FiEdit className={styles.edit} onClick={() => showEdit(product.id)} />
        <MdDeleteOutline
          className={styles.search}
          onClick={() => setShowDeleteDialog(true)}
        />
        {showDeleteDialog && (
          <div className={styles.dialogOverlay}>
            <div className={styles.dialog}>
              <div className={styles.image}>
                <img src={image} alt="image" className={styles.image} />
              </div>
              <button onClick={() => deleteHandeler(product.id)}>حذف</button>
              <button onClick={() => setShowDeleteDialog(false)}>انصراف</button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}

export default List;
