import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import List from "../components/List";
import styles from "./products.module.css";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ShowUsername from "../components/ShowUsername";
import api from "../service/config";
import Paginations from "../components/Pagination";
import { useContext } from "react";
import { ProductContext } from "../context/userContext";
import { NotificationContext } from "../context/NotificationContext";
import GroupDelete1 from "../components/GroupDelete";

function Products() {
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showGroupDeleteDialog, setShowGroupDeleteDialog] = useState(false);
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [page, setPage] = useState(1);
  const { ids } = useContext(ProductContext);
  const { allert, alertType, notification } = useContext(NotificationContext);

  useEffect(() => {
    if (allert) {
      const timer = setTimeout(() => {
        notification("", "");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [allert]);

  useEffect(() => {
    api
      .get(`/products?page=${page}&limit=10`)
      .then((res) => setList(res.data.data))
      .catch((err) => {
        err, setList([]);
      });
  }, [refreshList, page]);

  const logoutHandeler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      <Search setList={setList} />
      <ShowUsername />
      {allert && (
        <p
          className={
            alertType === "success" ? styles.alertSuccess : styles.alertError
          }
        >
          {allert}
        </p>
      )}
      <button onClick={logoutHandeler} className={styles.logoutBtn}>
        خروج
      </button>
      <p className={styles.p}>مدیریت کالا</p>
      <button className={styles.btn} onClick={() => setShowAddDialog(true)}>
        افزودن محصول
      </button>
      <hr />
      {ids.length > 0 ? (
        <button
          className={styles.deleteGroup}
          onClick={() => setShowGroupDeleteDialog(true)}
        >
          حذف گزینه های انتخاب شده
        </button>
      ) : null}
      {showGroupDeleteDialog && (
        <GroupDelete1
          setShowGroupDeleteDialog={setShowGroupDeleteDialog}
          setRefreshList={setRefreshList}
        />
      )}
      {showAddDialog && (
        <AddProduct
          setShowAddDialog={setShowAddDialog}
          setRefreshList={setRefreshList}
        />
      )}
      <table className={ids.length > 0 ? `${styles.tableWithButton}` : ""}>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th>عملگرها</th>
          </tr>
        </thead>
        {list.length > 0 ? (
          <tbody>
            {list.map((product, index) => (
              <List
                key={product.id}
                product={product}
                index={index}
                setRefreshList={setRefreshList}
                setShowAddDialog={setShowAddDialog}
                page={page}
              />
            ))}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td className={styles.noMoreProduct} colSpan="5">
                هیچ محصولی موجود نیست
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <Paginations setPage={setPage} />
    </>
  );
}

export default Products;
