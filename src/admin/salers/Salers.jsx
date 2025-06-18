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
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import instance from "../../axios";

const Salers = () => {
  const [salers, setSalers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchSalers = async (page) => {
    setLoading(true);
    try {
      const response = await instance.get("Account", {
        params: { PageIndex: page },
      });
      const data = response.data.data;

      console.log("API Response items:", data.items);

      const updatedSalers = data.items.map(item => ({
        ...item,
        role: item.roles && item.roles.length > 0 ? item.roles[0] : "", // استخراج أول رول
      }));

      setSalers(updatedSalers);
      setTotalPages(Math.ceil(data.count / data.pageSize));
    } catch (error) {
      console.error("Error fetching salers:", error);
      setSnackbar({ open: true, message: "فشل تحميل البيانات", severity: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSalers(page);
  }, [page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const handleRoleChange = async (userId, newRole) => {
    const body = {
      userId: userId,
      role: newRole,
    };

    try {
      const res = await instance.post("Account/role", body, {
        headers: { "Content-Type": "application/json" }
      });

      setSalers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setSnackbar({ open: true, message: "تم تحديث الرول بنجاح", severity: "success" });
    } catch (error) {
      console.error("Error updating role:", error?.response?.data || error.message);
      setSnackbar({ open: true, message: "فشل تحديث الرول", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <div style={{ direction: "rtl" }}>
      <div className="main-header">
        <h1>البائعين</h1>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <TableContainer component={Paper} className="tableContainer">
          <Table className="table table-striped table-hover">
            <TableHead className="subhead">
              <TableRow>
                <TableCell>اسم التاجر</TableCell>
                <TableCell>البريد الإلكتروني</TableCell>
                <TableCell>المحافظة</TableCell>
                <TableCell>المدينة</TableCell>
                <TableCell>رقم الهاتف</TableCell>
                <TableCell>الرول الحالي</TableCell>
                <TableCell>تعيين الرول</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salers.length > 0 ? (
                salers.map((sale, index) => (
                  <TableRow key={index} className="subContent">
                    <TableCell>{sale.displayName}</TableCell>
                    <TableCell>{sale.email}</TableCell>
                    <TableCell>{sale.governorate || "—"}</TableCell>
                    <TableCell>{sale.city || "—"}</TableCell>
                    <TableCell>{sale.mobile || "—"}</TableCell>
                    <TableCell>{sale.role || "غير محدد"}</TableCell>
                    <TableCell>
                      <Select
                        value={sale.role || ""}
                        onChange={(e) => handleRoleChange(sale.id, e.target.value)}
                        displayEmpty
                        sx={{ minWidth: "120px" }}
                      >
                        <MenuItem value=""><em>اختر الرول</em></MenuItem>
                        <MenuItem value="Admin">مدير</MenuItem>
                        <MenuItem value="Trader">تاجر</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    لا توجد بيانات لعرضها
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="pagination" style={{ marginTop: "20px" }}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ next: ArrowBackIcon, previous: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Salers;
