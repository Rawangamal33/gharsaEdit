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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders, setOrdersFilter } from "../../redux/ordersSlice";
import { useNavigate } from "react-router";

const Orders = () => {
  const { orders, ordersFilter, totalPages } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders({ ...ordersFilter }));
  }, [dispatch, ordersFilter]);

  const handlePageChange = (_, page) => {
    dispatch(setOrdersFilter({ ...ordersFilter, PageIndex: page }));
  };

  return (
    <div>
      <div className="main-header">
        <h1>الطلبات</h1>
      </div>
      <TableContainer
        component={Paper}
        className="tableContainer"
        style={{ backgroundColor: "#101010" }}
      >
        <Table className="table table-striped table-hover">
          <TableHead className="subhead">
            <TableRow>
              <TableCell>اسم المشتري</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>رقم الهاتف</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>تفاصيل</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order, index) => (
              <TableRow key={index} className="subContent">
                <TableCell>{order.clientName}</TableCell>
                <TableCell>{order.totalItemsCost}</TableCell>
                <TableCell>{order.clientPhone}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell onClick={() => navigate(`/admin/order/${order.id}`)}>
                  <button className="--btn --main-btn">تفاصيل</button>
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
              page={ordersFilter?.PageIndex || 1}
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

export default Orders;
