import React from "react";
import Search from "../components/Search";
import List from "../components/List";
import styles from "./products.module.css"

function Products() {
  return (
    <>
      <Search />
      <p className={styles.p} >مدیریت کالا</p>
      <button className={styles.btn}>افزودن محصول</button>
      <hr />
      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th>عملگرها</th>
          </tr>
        </thead>
        <tbody>
          <List />
        </tbody>
      </table>
    </>
  );
}

export default Products;
