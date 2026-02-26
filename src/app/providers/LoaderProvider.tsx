import { createContext, useContext, useState } from "react";
import GlobalLoader from "../../components/common/GlobalLoader";

interface LoaderContextType {
    showLoader: () => void;
    hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | null>(null)

export const LoaderProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false)
    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return <LoaderContext.Provider value={{ showLoader, hideLoader }}>
        {children}
    <GlobalLoader open={loading} />
    </LoaderContext.Provider>
}

export const useLoader = () => {
    const context = useContext(LoaderContext)
    if (!context) throw new Error("useLoader must be inside LoaderProvider");
    return context;
}