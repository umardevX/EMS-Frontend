import { Container, Grid2, TextField, Button, Link, Typography, Checkbox, FormControlLabel, Box, Alert, Snackbar } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

interface FormValues {
    username: string,
    email: string;
    password: string;
}

interface FormErrors {
    username?: string,
    email?: string;
    password?: string;
}

const SignUp = () => {

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<FormValues>({ username: '', email: '', password: '' });
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

        if (!formValues.username) {
            errors.username = 'Username is required';
            valid = false;
        }

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

        axiosInstance.post('/signup', formValues)
            .then((response) => {
                if (response.status === 200) {

                    setSnackbar({
                        open: true,
                        message: "Signup successfully",
                        severity: 'success',
                        position: { vertical: 'top', horizontal: 'right' },
                    });

                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 500);

                } else {
                    setError('Something went wrong');
                }
            })
            .catch(() => {
                setError('Signup failed.');
                setSnackbar({
                    open: true,
                    message: 'Signup failed.. Please check your credentials.',
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
                    <Grid2 size={{ xs: 12, md: 4 }} sx={{ textAlign: 'left' }}>

                        <form onSubmit={handleSubmit}>

                            <TextField
                                fullWidth
                                sx={{ mb: "10px" }}
                                label="Username"
                                name="username"
                                size="small"
                                type="text"
                                variant="outlined"
                                value={formValues.username}
                                onChange={handleChange}
                                error={!!formErrors.username}
                                helperText={formErrors.username}
                            />

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
                                sx={{ mb: "10px" }}
                                size="small"
                                label="Password"
                                name="password"
                                variant="outlined"
                                type="password"
                                value={formValues.password}
                                onChange={handleChange}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                            />

                            <FormControlLabel
                                control={<Checkbox />}
                                label={<span>I agree to{' '}<Link href="/privacy-policy" underline="none">privacy policy & terms</Link></span>}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </form>
                        {error && <Typography sx={{ color: 'red', mt: '10px' }}>{error}</Typography>}
                        <Typography sx={{ mt: "20px" }} textAlign={"center"} color="text.secondary" gutterBottom>Already have an account? <Link href="/signin" underline="none">Sign in instead</Link></Typography>
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

export default SignUp;