import { useContext } from "react";
import styles from "./AddProduct.module.css";
import api from "../service/config";
import { ProductContext } from "../context/userContext";

function AddProduct({ setShowAddDialog, setRefreshList }) {
  const {
    name,
    setName,
    price,
    setPrice,
    quantity,
    setQuantity,
    isEdit,
    setIsEdit,
    id,
  } = useContext(ProductContext);

  const addProductHandler = () => {
    api
      .post("/products", {
        name: name,
        price: price,
        quantity: quantity,
      })
      .then((res) => {
        res.data, setRefreshList(true);
        setShowAddDialog(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editHandeler = (id) => {
    api
      .put(`products/${id}`, {
        name: name,
        price: price,
        quantity: quantity,
      })
      .then((res) => {
        res, setRefreshList(true);
        setShowAddDialog(false);
      });
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        {isEdit ? <h1>ویرایش محصول </h1> : <h1>ایجاد محصول جدید</h1>}
        <div className={styles.inputGroup}>
          <label>نام کالا</label>
          <input
            type="text"
            value={name}
            placeholder="نام کالا"
            onChange={(e) => setName(e.target.value)}
          />
          <label>تعداد موجودی</label>
          <input
            type="text"
            value={quantity}
            placeholder="تعداد"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label>قیمت</label>
          <input
            type="text"
            value={price}
            placeholder=" قیمت"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          {isEdit ? (
            <button onClick={() => editHandeler(id)}> ویرایش</button>
          ) : (
            <button onClick={addProductHandler}>ایجاد محصول</button>
          )}
          <button onClick={() => setShowAddDialog(false)}>انصراف</button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
