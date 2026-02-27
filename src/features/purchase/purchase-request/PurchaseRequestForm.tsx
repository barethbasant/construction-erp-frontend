import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useForm, useFieldArray } from "react-hook-form";

const PurchaseRequestForm = ({
  open,
  handleClose,
  onSubmit,
  sites,
  materials,
}: any) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      siteId: "",
      items: [{ materialId: "", quantity: 1, remarks: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md" // 🔥 reduce width (better UI)
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Create Purchase Request
      </DialogTitle>

      <DialogContent>
        {/* HEADER */}
        <Stack spacing={2} mt={1}>
          <TextField
            select
            fullWidth
            label="Site"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: { maxHeight: 200 },
                },
              },
            }}
            {...register("siteId")}
          >
            {sites.map((site: any) => (
              <MenuItem key={site.id} value={site.id}>
                {site.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* ITEMS */}
        <Typography mt={3} mb={1}>
          Items
        </Typography>

        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 2,
            mt: 2,
            backgroundColor: "#fafafa",
          }}
        >
          {fields.map((field, index) => (
            <Stack
              key={field.id}
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
              mb={2}
            >
              {/* MATERIAL */}
              <TextField
                select
                fullWidth
                size="small"
                label="Material"
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: { maxHeight: 200 },
                    },
                  },
                }}
                {...register(`items.${index}.materialId`)}
              >
                {materials.map((m: any) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* QTY */}
              <TextField
                size="small"
                label="Qty"
                type="number"
                sx={{ width: 120 }}
                {...register(`items.${index}.quantity`)}
              />

              {/* REMARKS */}
              <TextField
                size="small"
                label="Remarks"
                fullWidth
                {...register(`items.${index}.remarks`)}
              />

              {/* DELETE */}
              <IconButton
                onClick={() => remove(index)}
                sx={{
                  bgcolor: "#ffebee",
                  "&:hover": { bgcolor: "#ffcdd2" },
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Stack>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={() =>
              append({ materialId: "", quantity: 1, remarks: "" })
            }
          >
            Add Item
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseRequestForm;