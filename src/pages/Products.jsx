import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import List from "../components/List";
import styles from "./products.module.css";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ShowUsername from "../components/ShowUsername";
import api from "../service/config";
import Paginations from "../components/Pagination";


function Products() {
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [page,setPage]=useState()


  

  useEffect(() => {
    api.get(`/products?page=${page}&limit=10`).then((res) => setList(res.data.data));
  }, [refreshList,page]);

  const logoutHandeler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  
  return (
    <>
      <Search />
      <ShowUsername />
      <button onClick={logoutHandeler} className={styles.logoutBtn}>
        خروج
      </button>
      <p className={styles.p}>مدیریت کالا</p>
      <button className={styles.btn} onClick={() => setShowAddDialog(true)}>
        افزودن محصول
      </button>
      <hr />
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
      </table>
      <Paginations  setPage={setPage}/>
    </>
  );
}

export default Products;
