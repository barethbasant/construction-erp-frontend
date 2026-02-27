import { DataGrid } from "@mui/x-data-grid";
import type {
  GridColDef,
  GridRowsProp,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

type Props = {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading?: boolean;
  pageSize?: number;
  onPageChange?: (model: GridPaginationModel) => void;
};

export default function DataTable({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  onPageChange,
}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        pagination
        pageSizeOptions={[5, 10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        disableRowSelectionOnClick
        onPaginationModelChange={onPageChange}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "none",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f7fb",
            fontWeight: "bold",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f9fafb",
          },
        }}
      />

      {!loading && rows.length === 0 && (
        <Typography align="center" sx={{ mt: 2 }}>
          No data found
        </Typography>
      )}
    </Box>
  );
}