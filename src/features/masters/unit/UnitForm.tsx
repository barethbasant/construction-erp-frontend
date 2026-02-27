import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import type { CreateUnitDto, Unit } from "../../../types/unit";


interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: CreateUnitDto) => void;
  defaultValues?: Unit | null;
}

const schema = yup.object({
  name: yup.string().required("Unit name is required"),
});

const UnitForm = ({
  open,
  handleClose,
  onSubmit,
  defaultValues,
}: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<CreateUnitDto>({
      resolver: yupResolver(schema),
    });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({
        name: "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {defaultValues ? "Edit Unit" : "Add Unit"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Unit Name"
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

    
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnitForm;