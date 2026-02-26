import { useEffect, useState } from 'react'
import {
    Typography,
    Button,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Category } from '../../../types/category';
import CategoryForm from './CategoryForm';
import { createCategory, deleteCategory, getCategories, updateCategory } from './categoryApi';
import { useLoader } from '../../../app/providers/LoaderProvider';
import { useSnackbar } from '../../../app/providers/SnackBarProvider';


const CategoryPage = () => {

    const { showLoader, hideLoader } = useLoader();
    const { showSnackbar } = useSnackbar();

    const [categories, setCategories] = useState<Category[]>([])
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Category | null>(null);

    const fetchData = async () => {
        const data = await getCategories()
        // console.log(`Category data`, data.data);

        setCategories(data.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAdd = async (data: any) => {
        try {
            showLoader();

            if (selected) {
                await updateCategory(selected.id, data);
                showSnackbar("Category updated successfully");
            } else {
                await createCategory(data);
                showSnackbar("Category created successfully");
            }

            fetchData();
            setOpen(false);
        } catch (error: any) {
            showSnackbar(error.message || "Something went wrong", "error");
        } finally {
            hideLoader();
        }
    };

    const handleEdit = (cat: Category) => {
        setSelected(cat);
        setOpen(true);
    };

    const handleDelete = async (id: number) => {
        await deleteCategory(id);
        fetchData();
    };

    return <>
        <Typography variant="h4" fontWeight="bold" mb={3}>
            Category Master
        </Typography>

        <Button
            variant="contained"
            onClick={() => {
                setSelected(null);
                setOpen(true);
            }}
        >
            Add Category
        </Button>

        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell>{cat.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEdit(cat)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton onClick={() => handleDelete(cat.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <CategoryForm
            open={open}
            handleClose={() => setOpen(false)}
            onSubmit={handleAdd}
            defaultValues={selected}
        />
    </>
}

export default CategoryPage