import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout = () => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Header open={open} toggleDrawer={toggleDrawer} />
            <Sidebar open={open} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: "margin 0.3s",
                    marginLeft: open ? `${drawerWidth}px` : "70px",
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;