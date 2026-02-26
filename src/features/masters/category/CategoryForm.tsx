import * as yup from 'yup'
import type { Category, CategoryFormValues } from "../../../types/category";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { useEffect } from 'react';

interface Props {
    open: boolean;
    handleClose: () => void;
    onSubmit: (data: CategoryFormValues) => void,
    defaultValues?: Category | null;
}

const schema = yup.object({
    name: yup.string().required("Category name is required")
})


const CategoryForm = ({ open, handleClose, onSubmit, defaultValues }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormValues>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        } else {
            reset({ name: "" });
        }
    }, [defaultValues, reset]);

    const submitHandler = (data: CategoryFormValues) => {
        onSubmit({
            ...data
        })

        reset()
        handleClose()
    }

    return <Dialog open={open} onClose={handleClose} fullWidth disableRestoreFocus={false}>
        <DialogTitle>Add Category</DialogTitle>

        <DialogContent>
            <TextField
                fullWidth
                label="Category Name"
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit(submitHandler)}>
                Save
            </Button>
        </DialogActions>
    </Dialog>

}

export default CategoryForm