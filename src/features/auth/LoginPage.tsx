import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

interface LoginFormInput {
    email: string;
    password: string
}

const schema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required")
})


const LoginPage = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: LoginFormInput) => {
        console.log(data);
        navigate("/dashboard")
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Card sx={{ width: 400, padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" mb={2}>
                        Construction ERP Login
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            type="password"
                            label="Password"
                            margin="normal"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default LoginPage;