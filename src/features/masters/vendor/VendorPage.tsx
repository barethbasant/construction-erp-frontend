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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Vendor } from "../../../types/vendor";
import {
  getVendors,
  updateVendor,
  createVendor,
  deleteVendor,
} from "./vendorApi";
import VendorForm from "./VendorForm";

import { useLoader } from "../../../app/providers/LoaderProvider";
import { useSnackbar } from "../../../app/providers/SnackBarProvider";

import DataTable from "../../../components/common/DataTable";

const VendorPage = () => {
  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar();

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Vendor | null>(null);
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
      const res = await getVendors();
      setVendors(res.data);
    } catch {
      showSnackbar("Failed to load vendors", "error");
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
        await updateVendor(selected.id, data);
        showSnackbar("Vendor updated successfully");
      } else {
        await createVendor(data);
        showSnackbar("Vendor created successfully");
      }

      setOpen(false);
      setSelected(null);
      fetchData();
    } catch {
      showSnackbar("Operation failed", "error");
    } finally {
      hideLoader();
    }
  };

  const handleEdit = (row: Vendor) => {
    setSelected(row);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      showLoader();
      await deleteVendor(id);
      showSnackbar("Vendor deleted successfully");
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
  const filtered = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  // ============================
  // ROWS
  // ============================
  const rows = filtered.map((item, index) => ({
    id: item.id,
    srNo: page * pageSize + index + 1,
    name: item.name,
    contactPerson: item.contactPerson || "-",
    phone: item.phone || "-",
    email: item.email || "-",
    gstNumber: item.gstNumber || "-",
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
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "contactPerson",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "gstNumber",
      headerName: "GST",
      width: 150,
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
          Vendor Master
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search vendor..."
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
            Add Vendor
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
      <VendorForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={selected}
      />
    </Box>
  );
};

export default VendorPage;