import { Alert, Box, Button, Container, Grid2, Link, Snackbar, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";


interface FormValues {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const SignIn = () => {

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
        position: { vertical: 'top' | 'bottom'; horizontal: 'right' | 'center' };
    }>({
        open: false,
        message: '',
        severity: 'success',
        position: { vertical: 'top', horizontal: 'right' },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setError('');

        let valid = true;
        const errors: FormErrors = {};

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;

        if (!formValues.email) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(formValues.email)) {
            errors.email = 'Email is invalid';
            valid = false;
        }

        if (!formValues.password) {
            errors.password = 'Password is required';
            valid = false;
        } else if (formValues.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
            valid = false;
        } else if (!passwordRegex.test(formValues.password)) {
            errors.password = 'Password must have uppercase, lowercase, and special character';
            valid = false;
        }

        setFormErrors(errors);

        if (!valid) {
            return;
        }

        axiosInstance.post('/signin', {
            email: formValues.email,
            password: formValues.password,
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    setSnackbar({
                        open: true,
                        message: "Logged in successfully",
                        severity: 'success',
                        position: { vertical: 'top', horizontal: 'right' },
                    });

                    setTimeout(() => {
                        navigate("/dashboard/employees");
                    }, 500);
                } else {
                    setError('Something went wrong');
                }
            })
            .catch(() => {
                setSnackbar({
                    open: true,
                    message: 'Sign-in failed. Please check your credentials.',
                    severity: 'error',
                    position: { vertical: 'top', horizontal: 'right' },
                });
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <>
            <Box mt={16} />

            <Container>
                <Grid2 container>

                    {/* left Grid */}
                    <Grid2 size={{ xs: 12, md: 4 }} />

                    {/* center Grid */}
                    <Grid2 size={{ xs: 12, md: 4 }}>

                        <Typography sx={{ mb: "10px" }} variant="h6" textAlign={"center"} gutterBottom> Welcome to EMS! 👋🏻</Typography>

                        <form onSubmit={handleSubmit}>

                            <TextField
                                fullWidth
                                sx={{ mb: "10px" }}
                                label="Email"
                                name="email"
                                size="small"
                                type="email"
                                variant="outlined"
                                value={formValues.email}
                                onChange={handleChange}
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                            />

                            <TextField
                                fullWidth
                                sx={{ mb: "15px" }}
                                size="small"
                                type="password"
                                label="Password"
                                name="password"
                                variant="outlined"
                                value={formValues.password}
                                onChange={handleChange}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                            >
                                Log In
                            </Button>
                        </form>
                        {error && <Typography sx={{ color: 'red', mt: '10px' }}>{error}</Typography>}
                        <Typography sx={{ mt: "20px" }} textAlign={"center"} color="text.secondary" gutterBottom>New on our platform? <Link href="/signup" underline="none">Create an account</Link></Typography>
                    </Grid2>

                    {/* right Grid */}
                    <Grid2 size={{ xs: 12, md: 4 }} />
                </Grid2>
            </Container>
            <Snackbar
                anchorOrigin={snackbar.position}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SignIn;