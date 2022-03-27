import { Alert, Snackbar } from "@mui/material";

const Toast = ({ toast, setToast }) => {
  const handleClose = (e, reason) => {
    if (reason !== "clickaway") {
      setToast({
        open: false,
        message: "",
        severity: "error",
      });
    }
  };
  return toast.open ? (
    <Snackbar
      open={toast.open}
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={toast.severity}>
        {toast.message}
      </Alert>
    </Snackbar>
  ) : null;
};

export default Toast;
