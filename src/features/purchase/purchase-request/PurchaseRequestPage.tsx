import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Box,
} from "@mui/material";

import { useLoader } from "../../../app/providers/LoaderProvider";
import { useSnackbar } from "../../../app/providers/SnackBarProvider";

import { getMaterials } from "../../masters/material/materialApi";
import { getSites } from "../../masters/site/siteApi";
import {
  getPurchaseRequests,
  createPurchaseRequest,
} from "./purchaseRequestApi";

import PurchaseRequestForm from "./PurchaseRequestForm";
import DataTable from "../../../components/common/DataTable";

const PurchaseRequestPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar();

  // ============================
  // FETCH DATA
  // ============================
  const fetchData = async () => {
    try {
      showLoader();

      const [pr, s, m] = await Promise.all([
        getPurchaseRequests(),
        getSites(),
        getMaterials(),
      ]);

      setData(pr.data);
      setSites(s.data);
      setMaterials(m.data);
    } catch {
      showSnackbar("Failed to load data", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // SUBMIT
  // ============================
  const handleSubmit = async (formData: any) => {
    try {
      showLoader();
      await createPurchaseRequest(formData);
      showSnackbar("Request created successfully");
      setOpen(false);
      fetchData();
    } catch {
      showSnackbar("Failed to create request", "error");
    } finally {
      hideLoader();
    }
  };

  // ============================
  // SEARCH FILTER
  // ============================
const filtered = data.filter((pr: any) =>
  pr.status.toLowerCase().includes(search.toLowerCase())
);

  // ============================
  // ROWS
  // ============================
const rows = filtered.map((pr: any, index) => ({
  id: pr.id,
  srNo: page * pageSize + index + 1,
  status: pr.status,
  createdAt: new Date(pr.createdAt).toLocaleDateString(),
}));
  // ============================
  // COLUMNS
  // ============================
const columns = [
  {
    field: "srNo",
    headerName: "#",
    width: 80,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params: any) => {
      const color =
        params.value === "APPROVED"
          ? "success"
          : params.value === "REJECTED"
          ? "error"
          : "warning";

      return <Chip label={params.value} color={color} size="small" />;
    },
  },
  {
    field: "createdAt",
    headerName: "Date",
    flex: 1,
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
          Purchase Requests
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
            onClick={() => setOpen(true)}
          >
            Create Request
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
      <PurchaseRequestForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        sites={sites}
        materials={materials}
      />
    </Box>
  );
};

export default PurchaseRequestPage;