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
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
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
                    selected={location.pathname === "/unit"}
                    onClick={() => navigate("/unit")}
                    sx={{
                        "&.Mui-selected": { backgroundColor: "#334155" },
                        "&:hover": { backgroundColor: "#334155" },
                    }}
                >
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary="Unit Master" />}
                </ListItemButton>

                <ListItemButton
                    selected={location.pathname === "/material"}
                    onClick={() => navigate("/material")}
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
                    selected={location.pathname === "/vendor"}
                    onClick={() => navigate("/vendor")}
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
                    {open && <ListItemText primary="Vendor" />}
                </ListItemButton>

                 <ListItemButton
                    selected={location.pathname === "/site"}
                    onClick={() => navigate("/site")}
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
                    {open && <ListItemText primary="Site" />}
                </ListItemButton>

                 <ListItemButton
                    selected={location.pathname === "/purchase-request"}
                    onClick={() => navigate("/purchase-request")}
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
                    {open && <ListItemText primary="Purchase Request" />}
                </ListItemButton>

                 <ListItemButton
                    selected={location.pathname === "/purchase-order"}
                    onClick={() => navigate("/purchase-order")}
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
                    {open && <ListItemText primary="Purchase Order" />}
                </ListItemButton>

                
            </List>
        </Drawer>
    );
};

export default Sidebar;