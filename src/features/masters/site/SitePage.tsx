import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Site } from "../../../types/site";
import {
  getSites,
  updateSite,
  createSite,
  deleteSite,
} from "./siteApi";
import SiteForm from "./SiteForm";

import { useLoader } from "../../../app/providers/LoaderProvider";
import { useSnackbar } from "../../../app/providers/SnackBarProvider";

import DataTable from "../../../components/common/DataTable";

const SitePage = () => {
  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar();

  const [sites, setSites] = useState<Site[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Site | null>(null);
  const [search, setSearch] = useState("");

  // pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // ============================
  // FETCH DATA
  // ============================
  const fetchData = async () => {
    try {
      showLoader();
      const res = await getSites();
      setSites(res.data);
    } catch {
      showSnackbar("Failed to load sites", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // HANDLERS
  // ============================
  const handleSubmit = async (data: any) => {
    try {
      showLoader();

      if (selected) {
        await updateSite(selected.id, data);
        showSnackbar("Site updated successfully");
      } else {
        await createSite(data);
        showSnackbar("Site created successfully");
      }

      setOpen(false);
      setSelected(null);
      fetchData();
    } catch (err: any) {
      if (err.response?.status === 409) {
        showSnackbar("Site Code already exists", "error");
      } else {
        showSnackbar("Operation failed", "error");
      }
    } finally {
      hideLoader();
    }
  };

  const handleEdit = (row: Site) => {
    setSelected(row);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      showLoader();
      await deleteSite(id);
      showSnackbar("Site deleted successfully");
      fetchData();
    } catch {
      showSnackbar("Delete failed", "error");
    } finally {
      hideLoader();
    }
  };

  // ============================
  // SEARCH FILTER
  // ============================
  const filtered = sites.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // ============================
  // ROWS
  // ============================
  const rows = filtered.map((item, index) => ({
    id: item.id,
    srNo: page * pageSize + index + 1,
    code: item.code,
    name: item.name,
    city: item.city || "-",
    state: item.state || "-",
    isActive: item.isActive,
  }));

  // ============================
  // COLUMNS
  // ============================
  const columns = [
    {
      field: "srNo",
      headerName: "#",
      width: 80,
      sortable: false,
    },
    {
      field: "code",
      headerName: "Code",
      width: 120,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 130,
      renderCell: (params: any) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box className="page-container">
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Site Master
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 250 }}
          />

          <Button
            variant="contained"
            onClick={() => {
              setSelected(null);
              setOpen(true);
            }}
          >
            Add Site
          </Button>
        </Stack>
      </Stack>

      {/* TABLE */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <DataTable
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
          />
        </CardContent>
      </Card>

      {/* FORM */}
      <SiteForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={selected}
      />
    </Box>
  );
};

export default SitePage;