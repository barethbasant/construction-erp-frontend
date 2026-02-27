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
import { getVendors } from "../../masters/vendor/vendorApi";
import { getPurchaseRequests } from "../purchase-request/purchaseRequestApi";

import {
  getPurchaseOrders,
  createPurchaseOrder,
} from "./purchaseOrderApi";

import PurchaseOrderForm from "./PurchaseOrderForm";
import DataTable from "../../../components/common/DataTable";

const PurchaseOrderPage = () => {
  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar();

  const [data, setData] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [prs, setPrs] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
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

      const [po, s, v, m, pr] = await Promise.all([
        getPurchaseOrders(),
        getSites(),
        getVendors(),
        getMaterials(),
        getPurchaseRequests(),
      ]);

      setData(po.data);
      setSites(s.data);
      setVendors(v.data);
      setMaterials(m.data);
      setPrs(pr.data);
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

      formData.totalAmount = formData.items.reduce(
        (sum: number, item: any) => sum + item.amount,
        0
      );

      await createPurchaseOrder(formData);

      showSnackbar("PO Created Successfully");
      setOpen(false);
      fetchData();
    } catch {
      showSnackbar("Failed to create PO", "error");
    } finally {
      hideLoader();
    }
  };

  // ============================
  // SEARCH FILTER
  // ============================
  const filtered = data.filter((po: any) =>
    po.poNumber?.toLowerCase().includes(search.toLowerCase())
  );

  // ============================
  // ROWS
  // ============================
  const rows = filtered.map((po: any, index) => ({
    id: po.id,
    srNo: page * pageSize + index + 1,
    poNumber: po.poNumber || "-",
    site: po.site?.name || "-",
    vendor: po.vendor?.name || "-",
    totalAmount: po.totalAmount || 0,
    status: po.status,
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
      field: "poNumber",
      headerName: "PO Number",
      flex: 1,
    },
    {
      field: "site",
      headerName: "Site",
      flex: 1,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
    },
    {
      field: "totalAmount",
      headerName: "Total",
      width: 150,
      renderCell: (params: any) => `₹ ${params.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => {
        const color =
          params.value === "APPROVED"
            ? "success"
            : params.value === "CLOSED"
            ? "error"
            : "warning";

        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
          />
        );
      },
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
          Purchase Orders
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search PO..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 250 }}
          />

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create PO
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
      <PurchaseOrderForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        sites={sites}
        vendors={vendors}
        materials={materials}
        purchaseRequests={prs}
      />
    </Box>
  );
};

export default PurchaseOrderPage;