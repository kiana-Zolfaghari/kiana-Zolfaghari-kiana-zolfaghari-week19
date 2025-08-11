import {  useState } from "react";
import styles from "./AddProduct.module.css";
import api from "../service/config";


function AddProduct({ setShowAddDialog }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
 


  const addProductHandler = () => {
    api
      .post(
        "/products",
        {
          name: name,
          price: price,
          quantity: quantity,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NTQ4NDM3MjI3NDQiLCJ1c2VybmFtZSI6ImtpbmlrYXciLCJpYXQiOjE3NTQ5MzEzMTIsImV4cCI6MTc1NDkzNDkxMn0.c0dHDgDM_1CWA6DyAE5xiZV2zImyDKucT25zBlmK23M",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
   
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <h1>ایجاد محصول جدید</h1>
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
          <button onClick={addProductHandler}>ایجاد محصول</button>
          <button onClick={() => setShowAddDialog(false)}>انصراف</button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
