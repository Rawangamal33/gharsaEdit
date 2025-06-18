import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./categories.module.scss";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../axios";
import { toast } from "sonner";
import { fetchCategories } from "../../redux/categoriesSlice";

const Categories = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      reset({ name: category.name });
    } else {
      reset({ name: "" });
    }
  }, [category, reset]);

  const handleAddCategory = () => {
    setShowPopup(true);
    setIsEdit(false);
    setCategory(null);
  };

  const handleEditCategory = (category) => {
    setShowPopup(true);
    setIsEdit(true);
    setCategory(category);
  };

  
  const closePopup = () => {
    setShowPopup(false);
    setCategory(null);
  };

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await instance.put(`Category/${category.id}`, { name: data.name });
        toast.success("تم تعديل الفئه بنجاح");
      } else {
        await instance.post("Category", { name: data.name });
        toast.success("تم إضافة الفئه بنجاح");
      }
      dispatch(fetchCategories());
    } catch {
      toast.error("حدث خطأ اثناء  من فضلك حاول مجددا");
    }
    reset();
    closePopup();
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`Category/${id}`);
      dispatch(fetchCategories());
      toast.success("تم حذف الفئه بنجاح");
    } catch {
      toast.error("حدث خطأ اثناء حذف الفئه من فضلك حاول مجددا");
    }
  };

  return (
    <div className={styles["categories-container"]}>
      <div className="main-header">
        <h1>الفئات</h1>
        <div>
          <button className="--main-btn" onClick={handleAddCategory}>
            <FaPlus /> إضافة فئة جديدة
          </button>
        </div>
      </div>
      <TableContainer
        component={Paper}
        className="tableContainer"
        style={{ backgroundColor: "#101010" }}
      >
        <Table className="table table-striped table-hover">
          <TableHead className="subhead">
            <TableRow>
              <TableCell> <div>إسم الفئه</div></TableCell>
              <TableCell> <div>تعديل الفئه</div></TableCell>
              <TableCell> <div>حذف الفئه</div></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id} className="subContent">
                <TableCell><p>{category.name}</p></TableCell>
                <TableCell>
                  <button
                    className="--btn --main-btn"
                    onClick={() => handleEditCategory(category)}
                  >
                    <p>تعديل</p>
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="--btn --main-btn"
                    onClick={() => handleDelete(category.id)}
                  >
                    <p>حذف</p>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPopup && (
        <div className={styles["popup-overlay"]} onClick={closePopup}>
          <div className={styles["popup-content"]} onClick={(e) => e.stopPropagation()}>
            <IoClose
              size={22}
              className={styles["close-icon"]}
              onClick={closePopup}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>{isEdit ? "تعديل الفئة" : "إضافة فئة"}</h2>
              <div className={styles["input-group"]}>
                <label htmlFor="name">إسم الفئة</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>هذا الحقل مطلوب</span>}
              </div>
              <div className="--btn-group">
                <button type="submit" className="--btn --main-btn">
                  حفظ
                </button>
                <button type="button" className="--btn" onClick={closePopup}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
