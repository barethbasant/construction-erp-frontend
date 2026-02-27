import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type {  Material } from "../../../types/material";
import type { Category } from "../../../types/category";
import type { Unit } from "../../../types/unit";

export type MaterialFormValues =  {
  name: string;
  categoryId: number | null;
  unitId: number | null;
  rate?: number;
  minimumStockLevel?: number;
};

interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: MaterialFormValues) => void;
  categories: Category[];
  units: Unit[];
  defaultValues?: Material | null;
}

// ✅ FIXED SCHEMA (use nullable)
const schema = yup.object({
  name: yup.string().required(),
  categoryId: yup.number().nullable().required(),
  unitId: yup.number().nullable().required(),
  rate: yup.number().optional(),
  minimumStockLevel: yup.number().optional(),
});
const MaterialForm = ({
  open,
  handleClose,
  onSubmit,
  categories,
  units,
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<MaterialFormValues>({
  resolver: yupResolver(schema) as any,
});

  // ============================
  // RESET FORM
  // ============================
  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        categoryId: defaultValues.categoryId ?? null,
        unitId: defaultValues.unitId ?? null,
        rate: defaultValues.rate,
        minimumStockLevel: defaultValues.minimumStockLevel,
      });
    } else {
      reset({
        name: "",
        categoryId: null,
        unitId: null,
        rate: 0,
        minimumStockLevel: 0,
      });
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {defaultValues ? "Edit Material" : "Add Material"}
      </DialogTitle>

      <DialogContent>
        {/* NAME */}
        <TextField
          fullWidth
          label="Material Name"
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* CATEGORY AUTOCOMPLETE */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => {
            const selected =
              categories.find((c) => c.id === field.value) || null;

            return (
              <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name}
                value={selected}
                onChange={(_, value) =>
                  field.onChange(value ? value.id : null)
                }
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                autoHighlight={false}
                autoSelect={false}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    margin="normal"
                    error={!!errors.categoryId}
                    helperText={errors.categoryId?.message}
                  />
                )}
              />
            );
          }}
        />

        {/* UNIT AUTOCOMPLETE */}
        <Controller
          name="unitId"
          control={control}
          render={({ field }) => {
            const selected =
              units.find((u) => u.id === field.value) || null;

            return (
              <Autocomplete
                options={units}
                getOptionLabel={(option) => option.name}
                value={selected}
                onChange={(_, value) =>
                  field.onChange(value ? value.id : null)
                }
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                autoHighlight={false}
                autoSelect={false}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Unit"
                    margin="normal"
                    error={!!errors.unitId}
                    helperText={errors.unitId?.message}
                  />
                )}
              />
            );
          }}
        />

        {/* RATE */}
        <TextField
          fullWidth
          type="number"
          label="Rate"
          margin="normal"
          {...register("rate")}
        />

        {/* MIN STOCK */}
        <TextField
          fullWidth
          type="number"
          label="Minimum Stock Level"
          margin="normal"
          {...register("minimumStockLevel")}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaterialForm;