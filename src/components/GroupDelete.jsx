import styles from "./GroupDelete.module.css";
import image from "../assets/Close.png";
import { ProductContext } from "../context/userContext";
import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";
import api from "../service/config";

function GroupDelete1({ setShowGroupDeleteDialog, setRefreshList }) {
  const { setIds, ids } = useContext(ProductContext);
  const { notification } = useContext(NotificationContext);

  const deleteGroupHandeler = () => {
    api
      .delete("/products", {
        data: { ids: ids },
      })
      .then(() => {
        setRefreshList((refreshList) => !refreshList);
        setShowGroupDeleteDialog(false);
        setIds([]);
        notification("success", "محصولات انتخاب شده با حذف شدند");
      })
      .catch((err) => {err,
        notification("err", "مشکلی پیش آمده");
        setShowGroupDeleteDialog(false)
      });
  };
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <div className={styles.image}>
          <img src={image} alt="image" className={styles.image} />
        </div>
        <p>آیا از حذف محصولات انتخاب شده مطمئنید؟</p>
        <button onClick={() => deleteGroupHandeler(ids)}>حذف</button>
        <button onClick={() => setShowGroupDeleteDialog(false)}>انصراف</button>
      </div>
    </div>
  );
}

export default GroupDelete1;
