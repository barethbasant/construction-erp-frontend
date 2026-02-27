import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
import type { CreateSiteDto, Site } from "../../../types/site";

interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: CreateSiteDto) => void;
  defaultValues?: Site | null;
}

const schema = yup.object({
  code: yup.string().required("Site Code is required"),
  name: yup.string().required("Site Name is required"),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .nullable()
    .optional(),
});

const SiteForm = ({
  open,
  handleClose,
  onSubmit,
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateSiteDto>({
    resolver: yupResolver(schema) as any,
    defaultValues: { isActive: true },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({
        code: "",
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        isActive: true,
      });
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {defaultValues ? "Edit Site" : "Add Site"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Site Code"
          margin="normal"
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code?.message}
        />

        <TextField
          fullWidth
          label="Site Name"
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          label="Address"
          margin="normal"
          {...register("address")}
        />

        <TextField
          fullWidth
          label="City"
          margin="normal"
          {...register("city")}
        />

        <TextField
          fullWidth
          label="State"
          margin="normal"
          {...register("state")}
        />

        <TextField
          fullWidth
          label="Pincode"
          margin="normal"
          {...register("pincode")}
          error={!!errors.pincode}
          helperText={errors.pincode?.message}
        />

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Active"
            />
          )}
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

export default SiteForm;