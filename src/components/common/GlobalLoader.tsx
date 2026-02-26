import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
    open: boolean;
}

const GlobalLoader = ({ open }: Props) => {
    return (
        <Backdrop
            open={open}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default GlobalLoader;