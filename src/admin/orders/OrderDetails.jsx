import { useParams } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import styles from "./order-details.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../redux/ordersSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const { order } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const convertData = () => {
    const timestamp = order.creationTime;
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString("ar-GB");
    const formattedTime = date.toLocaleTimeString("ar-GB");

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <div className={styles.orderDetails}>
        <div className={styles.clientInfo}>
          <h3>بيانات العميل</h3>
          <p>
            <span>اسم العميل : </span>
            {order.clientName}
          </p>
          <p>
            <span> رقم الهاتف : </span>
            {order.clientPhone}
          </p>
          <p>
            <span> تاريخ الطلب : </span>
            {convertData()}
          </p>
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
                <div>الكميه</div>
              </TableCell>
              <TableCell>
                <div> الفئة</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.items?.map((order, index) => (
              <TableRow key={index} className="subContent">
                <TableCell>
                  <p>{order.productName}</p>
                </TableCell>
                <TableCell>
                  <p>{order.quantity}</p>
                </TableCell>
                <TableCell>
                  <p>{order.categoryName}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.totalCost}>اجمالي المبلغ : <p>{order.totalItemsCost}</p></div>
    </div>
  );
};

export default OrderDetails;
