import { createContext, useContext, useState } from "react";
import GlobalSnackBar from "../../components/common/GlobalSnackBar";

interface SnackbarContextType {
    showSnackbar: (message: string, severity?: "success" | "error") => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: any) => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<"success" | "error">("success");

    const showSnackbar = (
        msg: string,
        type: "success" | "error" = "success"
    ) => {
        setMessage(msg);
        setSeverity(type);
        setOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <GlobalSnackBar
                open={open}
                message={message}
                severity={severity}
                handleClose={() => setOpen(false)}
            />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error("useSnackbar must be inside provider");
    return context;
};