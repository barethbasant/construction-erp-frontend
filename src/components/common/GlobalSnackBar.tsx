import { Snackbar, Alert } from "@mui/material";

interface Props {
    open: boolean;
    message: string;
    severity: "success" | "error";
    handleClose: () => void;
}

const GlobalSnackBar = ({
    open,
    message,
    severity,
    handleClose,
}: Props) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity={severity} onClose={handleClose} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackBar;