import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Page404 = () => {

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return(
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={25}
    >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Typography variant="h1" component="h1" color="text.primary" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
                Oops! page not found!
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Sorry, we couldn’t find the page you’re looking for.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                GO BACK
            </Button>
        </Container>
    </Box>
    )
}

export default Page404;