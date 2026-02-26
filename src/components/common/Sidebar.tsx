import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
    open: boolean;
}

const drawerWidth = 240;

const Sidebar = ({ open }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : 70,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: open ? drawerWidth : 70,
                    boxSizing: "border-box",
                    transition: "width 0.3s",
                    overflowX: "hidden",
                    backgroundColor: "#1e293b",
                    color: "#fff",
                },
            }}
        >
            <Toolbar />

            <List>
                <ListItemButton
                    selected={location.pathname === "/dashboard"}
                    onClick={() => navigate("/dashboard")}
                    sx={{
                        "&.Mui-selected": {
                            backgroundColor: "#334155",
                        },
                        "&:hover": {
                            backgroundColor: "#334155",
                        },
                    }}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary="Dashboard" />}
                </ListItemButton>

                <ListItemButton
                    selected={location.pathname === "/categories"}
                    onClick={() => navigate("/categories")}
                    sx={{
                        "&.Mui-selected": { backgroundColor: "#334155" },
                        "&:hover": { backgroundColor: "#334155" },
                    }}
                >
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary="Category Master" />}
                </ListItemButton>

                <ListItemButton
                    selected={location.pathname === "/materials"}
                    onClick={() => navigate("/materials")}
                    sx={{
                        "&.Mui-selected": {
                            backgroundColor: "#334155",
                        },
                        "&:hover": {
                            backgroundColor: "#334155",
                        },
                    }}
                >
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary="Material Master" />}
                </ListItemButton>

                <ListItemButton
                    selected={location.pathname === "/projects"}
                    onClick={() => navigate("/projects")}
                    sx={{
                        "&.Mui-selected": {
                            backgroundColor: "#334155",
                        },
                        "&:hover": {
                            backgroundColor: "#334155",
                        },
                    }}
                >
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary="Projects" />}
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;