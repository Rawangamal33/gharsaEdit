import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  PaginationItem,
  Pagination,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import instance from "../../axios";
import { fetchProducts, setProductFilter } from "../../redux/productsSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, totalPages, productFilter } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ ...productFilter, IsActive: null }));
  }, [dispatch, productFilter]);

  const handlePageChange = (_, page) => {
    dispatch(
      setProductFilter({ ...productFilter, PageIndex: page, IsActive: null })
    );
  };
  const deleteProductHandel = async (id) => {
    try {
      await instance.delete(`Product/${id}`);
      dispatch(fetchProducts({ ...productFilter, IsActive: null }));
      toast.success("تم حذف المنتج بنجاح");
    } catch {
      toast.error("حدث خطأ اثناء حذف المنتج من فضلك حاول مجددا");
    }
  };
  return (
    <div>
      <div className="main-header">
        <h1>مجموعتي</h1>
        <div>
          <button
            className="--main-btn"
            onClick={() => navigate("/admin/add-group")}
          >
            <FaPlus />
            اضافة منتج
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
              <TableCell>
                <div> اسم المنتج</div>
              </TableCell>
              <TableCell>
                <div>الفئة</div>
              </TableCell>
              <TableCell>
                <div>السعر</div>
              </TableCell>
              <TableCell>
                <div>الكمية</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={index} className="subContent">
                <TableCell>
                  <p>{product.name}</p>
                </TableCell>
                <TableCell>
                  <p>{product.categoryName}</p>
                </TableCell>
                <TableCell>
                  <p>{product.price}</p>
                </TableCell>
                <TableCell>
                  <p>{product.quantity}</p>
                </TableCell>
                <TableCell
                  onClick={() =>
                    navigate("/admin/edit-my-group", { state: product })
                  }
                >
                  <button className="--btn --main-btn">تعديل</button>
                </TableCell>
                <TableCell>
                  <button
                    className="--btn --main-btn"
                    onClick={() => deleteProductHandel(product.id)}
                  >
                    حذف
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={productFilter?.PageIndex || 1}
              color="primary"
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ next: ArrowBackIcon, previous: ArrowForwardIcon }}
                  {...item}
                  sx={{
                    color: "var(--main-color)",
                    "&.Mui-selected": {
                      bgcolor: "var(--main-color)",
                      color: "white",
                    },
                    "&:hover": {
                      bgcolor: "#00e18b !important",
                    },
                  }}
                />
              )}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default MyGroup;
