import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { CreateVendorDto, Vendor } from "../../../types/vendor";
 

interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: CreateVendorDto) => void;
  defaultValues?: Vendor | null;
}

const schema = yup.object({
  name: yup.string().required("Vendor name is required"),
  email: yup.string().email("Invalid email").nullable(),
});

const VendorForm = ({
  open,
  handleClose,
  onSubmit,
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVendorDto>({
    resolver: yupResolver(schema) as any ,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
        gstNumber: "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {defaultValues ? "Edit Vendor" : "Add Vendor"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Vendor Name"
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          label="Contact Person"
          margin="normal"
          {...register("contactPerson")}
        />

        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          {...register("phone")}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="GST Number"
          margin="normal"
          {...register("gstNumber")}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Address"
          margin="normal"
          {...register("address")}
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

export default VendorForm;