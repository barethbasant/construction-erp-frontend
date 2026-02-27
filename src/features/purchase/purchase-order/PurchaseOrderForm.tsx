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
import { useForm, useFieldArray, Controller } from "react-hook-form";

const PurchaseOrderForm = ({
  open,
  handleClose,
  onSubmit,
  sites,
  vendors,
  materials,
  purchaseRequests,
}: any) => {
  const { control, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      poNumber: "",
      siteId: "",
      vendorId: "",
      purchaseRequestId: "",
      items: [
        {
          materialId: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");

  // ============================
  // TOTAL CALCULATION
  // ============================
  const totalAmount = items.reduce(
    (sum: number, item: any) => sum + Number(item.amount || 0),
    0
  );

  // ============================
  // SUBMIT
  // ============================
  const handleFormSubmit = (data: any) => {
    data.totalAmount = totalAmount;
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Create Purchase Order</DialogTitle>

      <DialogContent>
        {/* ================= HEADER ================= */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={1}>
          <TextField fullWidth label="PO Number" {...register("poNumber")} />

          <TextField select fullWidth label="Site" {...register("siteId")}>
            {sites.map((s: any) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField select fullWidth label="Vendor" {...register("vendorId")}>
            {vendors.map((v: any) => (
              <MenuItem key={v.id} value={v.id}>
                {v.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Purchase Request"
            {...register("purchaseRequestId")}
          >
            <MenuItem value="">None</MenuItem>
            {purchaseRequests.map((pr: any) => (
              <MenuItem key={pr.id} value={pr.id}>
                PR-{pr.id}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* ================= ITEMS ================= */}
        <Typography mt={3} mb={1}>
          Items
        </Typography>

        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
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
                {...register(`items.${index}.materialId`)}
                onChange={(e) => {
                  const materialId = Number(e.target.value);
                  setValue(`items.${index}.materialId`, materialId);

                  const selected = materials.find(
                    (m: any) => m.id === materialId
                  );

                  if (selected) {
                    const rate = Number(selected.rate || 0);
                    setValue(`items.${index}.rate`, rate);

                    const qty = Number(items[index]?.quantity || 0);
                    setValue(`items.${index}.amount`, qty * rate);
                  }
                }}
              >
                {materials.map((m: any) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* QUANTITY */}
              <Controller
                name={`items.${index}.quantity`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type="number"
                    label="Qty"
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      field.onChange(qty);

                      const rate = Number(items[index]?.rate || 0);
                      setValue(`items.${index}.amount`, qty * rate);
                    }}
                  />
                )}
              />

              {/* RATE */}
              <Controller
                name={`items.${index}.rate`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type="number"
                    label="Rate"
                    onChange={(e) => {
                      const rate = Number(e.target.value);
                      field.onChange(rate);

                      const qty = Number(items[index]?.quantity || 0);
                      setValue(`items.${index}.amount`, qty * rate);
                    }}
                  />
                )}
              />

              {/* AMOUNT */}
              <Controller
                name={`items.${index}.amount`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="Amount"
                    disabled
                  />
                )}
              />

              {/* DELETE */}
              <IconButton
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Stack>
          ))}

          {/* ADD ITEM */}
          <Button
            startIcon={<AddIcon />}
            onClick={() =>
              append({
                materialId: "",
                quantity: 1,
                rate: 0,
                amount: 0,
              })
            }
          >
            Add Item
          </Button>
        </Box>

        {/* ================= TOTAL ================= */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Typography variant="h6">
            Total: ₹ {totalAmount.toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseOrderForm;