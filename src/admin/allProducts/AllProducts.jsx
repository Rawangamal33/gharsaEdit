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

import instance from "../../axios";
import { fetchProducts, setProductFilter } from "../../redux/productsSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { products, totalPages, productFilter } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ ...productFilter }));
  }, [dispatch, productFilter]);

  const handlePageChange = (_, page) => {
    dispatch(setProductFilter({ ...productFilter, PageIndex:page }));
  };

  const handelAddProduct = async (product) => {
    try {
      await instance.patch(`Product/${product.id}`);
      dispatch(fetchProducts({ ...productFilter }));
      toast.success("تم إضافة المنتج بنجاح");
    } catch {
      toast.error("حدث خطأ اثناء إضافة المنتج من فضلك حاول مجددا");
    }
  };

  const deleteProductHandel = async (id) => {
    try {
      await instance.delete(`Product/${id}`);
      dispatch(fetchProducts({ ...productFilter }));
      toast.success("تم حذف المنتج بنجاح");
    } catch {
      toast.error("حدث خطأ اثناء حذف المنتج من فضلك حاول مجددا");
    }
  };
  return (
    <div style={{ marginTop: "5rem" }}>
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
                <div> اسم التاجر</div>
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
              <TableCell>
                <div>تاريخ الحصاد </div>
              </TableCell>
              <TableCell>
                <div>تاريخ الطلب</div>
              </TableCell>
              <TableCell>
                <div>الوصف</div>
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
                  <p>{product.traderName}</p>
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
                <TableCell>
                  <p>{product.orderedDate}</p>
                </TableCell>
                <TableCell>
                  <p>{product.harvestDate}</p>
                </TableCell>
                <TableCell>
                  <p>{product.description}</p>
                </TableCell>
                <TableCell onClick={() => handelAddProduct(product)}>
                  <button className="--btn --main-btn">اضافه</button>
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

export default AllProducts;
