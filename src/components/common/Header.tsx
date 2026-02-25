import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
    open: boolean;
    toggleDrawer: () => void;
}

const drawerWidth = 240;

const Header = ({ open, toggleDrawer }: HeaderProps) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: open ? `calc(100% - ${drawerWidth}px)` : "calc(100% - 70px)",
                ml: open ? `${drawerWidth}px` : "70px",
                transition: "all 0.3s",
                backgroundColor: "#2563eb",
            }}
        >
            <Toolbar>
                <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap>
                    Construction ERP
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;