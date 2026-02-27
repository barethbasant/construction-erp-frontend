import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      {/* HEADER */}
      <Header open={open} toggleDrawer={toggleDrawer} />

      {/* SIDEBAR */}
      <Sidebar open={open} />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        {/* prevent header overlap */}
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;