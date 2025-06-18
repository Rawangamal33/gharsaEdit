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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, setSalesFilter } from "../../redux/salesSlice";

const Sales = () => {
  const dispatch = useDispatch();
  const { sales, salesFilter,totalPages } = useSelector(
    (state) => state.sales
  );

  useEffect(() => {
    dispatch(fetchSales({ ...salesFilter }));
  }, [dispatch, salesFilter]);


  const handlePageChange = (_, page) => {
    dispatch(setSalesFilter({ ...salesFilter, PageIndex: page }));
  };
  return (
    <div>
      <div className="main-header">
        <h1>مبيعات</h1>
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
            {sales?.map((sale, index) => (
              <TableRow key={index} className="subContent">
                <TableCell>
                  <p>{sale.productName}</p>
                </TableCell>
                <TableCell>
                  <p>{sale.categoryName}</p>
                </TableCell>
                <TableCell>
                  <p>{sale.totalPrice}</p>
                </TableCell>
                <TableCell>
                  <p>{sale.totalQuantity}</p>
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
              page={salesFilter.PageIndex || 1}
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

export default Sales;
