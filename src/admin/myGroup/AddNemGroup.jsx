import { useForm } from "react-hook-form";
import styles from "./products.module.scss";
import { GoUpload } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categoriesSlice";
import instance from "../../axios";
import { toast } from "sonner";

const AddNemGroup = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("Name", data.name);
    formData.append("Description", data.description);
    formData.append("Price", data.oldPrice);
    formData.append("Discount", data.discount);
    formData.append("Quantity", data.quantity);
    formData.append("HarvestDate", data.date);
    formData.append("CategoryId", data.category);
    formData.append("ImageCover", image);
    formData.append("AppUserId", "f7b9808b-1a39-4990-b9e0-aee29ddaffd7");

    // Add new product to the database here
    setLoading(true);
    try {
      await instance.post("Product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("تم إضافة المنتج بنجاح");
      reset();
      setLoading(false);
    } catch {
      toast.error("حدث خطأ اثناء إضافة المنتج من فضلك حاول مجددا");

      setLoading(false);
    }
  };
  return (
    <div className={styles["product-container"]}>
      <div className="main-header">
        <h1>اضافة منتج جديد</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-inputs"]}>
            <div className={styles["defult-input"]}>
              <h2>تفاصيل المنتج</h2>
              <div className={styles["input-group"]}>
                <label htmlFor="name">اسم المنتج</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "يجب ادخال اسم المنتج" })}
                />
                {errors.name && (
                  <p className={styles["error"]}>{errors.name.message}</p>
                )}
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="date"> تاريخ الحصاد</label>
                <input
                  type="date"
                  id="date"
                  {...register("date", {
                    required: "يجب ادخال تاريخ حصاد المنتج",
                  })}
                />
                {errors.date && (
                  <p className={styles["error"]}>{errors.date.message}</p>
                )}
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="category">الفئة</label>
                <select
                  id="category"
                  {...register("category", {
                    required: "يجب ادخال فئة المنتج",
                  })}
                >
                  <option value="">إختر الفئه</option>
                  {categories?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                {errors.category && (
                  <p className={styles["error"]}>{errors.category.message}</p>
                )}
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="quantity">الكمية</label>
                <input
                  type="text"
                  id="quantity"
                  {...register("quantity", {
                    required: "يجب ادخال كمية المنتج",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "الكميه لابد ان تكون ارقام",
                    },
                  })}
                />
                {errors.quantity && (
                  <p className={styles["error"]}>{errors.quantity.message}</p>
                )}
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="description"> الوصف</label>
                <textarea
                  id="description"
                  rows="7"
                  {...register("description", {
                    required: "يجب ادخال  وصف المنتج",
                  })}
                ></textarea>
                {errors.description && (
                  <p className={styles["error"]}>
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className={styles.price}>
                <div className={styles["input-group"]}>
                  <label htmlFor="old-price">السعر قبل الخصم</label>
                  <input
                    type="text"
                    id="old-price"
                    {...register("oldPrice", {
                      required: "يجب ادخال  السعر",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "السعر لابد انا يكون ارقام",
                      },
                    })}
                  />
                  {errors.oldPrice && (
                    <p className={styles["error"]}>{errors.oldPrice.message}</p>
                  )}
                </div>
                <div className={styles["input-group"]}>
                  <label htmlFor="discount"> الخصم</label>
                  <input
                    type="text"
                    id="discount"
                    {...register("discount", {
                      required: "يجب ادخال الخصم",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "الخصم لابد انا يكون ارقام",
                      },
                    })}
                  />
                  {errors.discount && (
                    <p className={styles["error"]}>{errors.discount.message}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Upload Image */}
            <div className={styles["image-upload-section"]}>
              <h2>صورة الغلاف</h2>
              <div
                className={`${styles["image-upload"]} ${styles.cover}`}
                style={{
                  border: image ? "none" : "2px dashed var(--main-color)",
                }}
              >
                <label htmlFor="coverImg">
                  <input
                    type="file"
                    id="coverImg"
                    {...register("image", {
                      required: "يجب تحميل صورة المنتج",
                      validate: () => image !== null || "يجب تحميل صورة المنتج",
                    })}
                    onChange={handleImageChange}
                    accept="image/*"
                    hidden
                  />
                  <div
                    className={styles.productPicture}
                    style={{
                      backgroundImage: image
                        ? `url(${URL.createObjectURL(image)})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "9rem",
                    }}
                  >
                    {!image && (
                      <div className={styles.title}>
                        <GoUpload />
                        <h4>تحميل صورة المنتج</h4>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              {errors.image && (
                <p className={styles["error"]}>{errors.image.message}</p>
              )}
            </div>
          </div>
          <div className={styles["btn"]}>
            <button type="submit">
              {loading ? ".. جاري التحميل" : "اضافة المنتج "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNemGroup;
