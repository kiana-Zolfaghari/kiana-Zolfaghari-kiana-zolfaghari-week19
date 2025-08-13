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

function Products() {
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [page, setPage] = useState(1);

  const { ids } = useContext(ProductContext);

  useEffect(() => {
    api
      .get(`/products?page=${page}&limit=10`)
      .then((res) => setList(res.data.data));
  }, [refreshList, page]);

  const logoutHandeler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const deleteGroupHandeler = () => {
    api.delete("/products", {
      data: { ids: ids }
    }).then((res) => {
      res,
      setRefreshList(true)
    });
  };

  return (
    <>
      <Search setList={setList} />
      <ShowUsername />
      <button onClick={logoutHandeler} className={styles.logoutBtn}>
        خروج
      </button>
      <p className={styles.p}>مدیریت کالا</p>
      <button className={styles.btn} onClick={() => setShowAddDialog(true)}>
        افزودن محصول
      </button>
      <hr />
      {ids.length>0? <button  className={styles.deleteGroup} onClick={deleteGroupHandeler}>حذف گزینه های انتخاب شده</button> : null}
      {showAddDialog && (
        <AddProduct
          setShowAddDialog={setShowAddDialog}
          setRefreshList={setRefreshList}
        />
      )}
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
        {list.length > 0 ? (
          <tbody>
            {list.map((product) => (
              <List
                key={product.id}
                product={product}
                setRefreshList={setRefreshList}
                setShowAddDialog={setShowAddDialog}
               
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
