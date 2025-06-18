import { useForm } from "react-hook-form";
import styles from "./products.module.scss";
import { GoUpload } from "react-icons/go";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import instance from "../../axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categoriesSlice";
const EditMyGroup = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state) => state.categories);

  const location = useLocation();
  const {
    id,
    name,
    description,
    price,
    quantity,
    categoryId,
    imageCover,
    harvestDate,
    discount
  } = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      category: categoryId,
      oldPrice: price,
      date: harvestDate,
      discount:discount
    },
  });

  const [image, setImage] = useState(imageCover || null);

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

    try {
      setLoading(true);
      await instance.put(`Product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("تم تعديل المنتج بنجاح");
      setLoading(false);
      reset();
    } catch {
      setLoading(false);
      toast.error("حدث خطأ اثناء تعديل المنتج من فضلك حاول مجددا");
    }
  };
  return (
    <div className={styles["product-container"]}>
      <div className="main-header">
        <h1>تعديل المنتج </h1>
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
                    <p className={styles["error"]}>
                      {errors.discount.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Upload Image */}
            <div className={styles["image-upload-section"]}>
              <h1>صورة الغلاف</h1>
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
                    onChange={handleImageChange}
                    accept="image/*"
                    hidden
                  />
                  <div
                    className={styles.productPicture}
                    style={{
                      backgroundImage: image
                        ? image instanceof File
                          ? `url(${URL.createObjectURL(image)})`
                          : `url(${image})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "9rem",
                    }}
                  >
                    {!image && (
                      <div className={styles.title}>
                        <GoUpload />
                        <h4>تحميل صوره المنتج</h4>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className={styles["btn"]}>
            <button type="submit">
              {loading ? "جاري التحميل.." : "تعديل المنتج"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMyGroup;
