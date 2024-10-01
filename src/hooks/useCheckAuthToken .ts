import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthToken {
    exp?: number;
}

export const useCheckAuthToken = () => {
    const navigate = useNavigate();

    const access_token = localStorage.getItem("token");

    if (!access_token) {
        navigate("/signin");
        return false;
    }

    try {
        const decodedJwt = jwtDecode<AuthToken>(access_token);
        const currentDate = new Date();

        // Check if token is expired 
        if (!decodedJwt.exp || decodedJwt.exp * 1000 <= currentDate.getTime()) {
            navigate("/signin");
            return false;
        }

        return true;
    } catch (error) {

        console.error(error);
        navigate("/signin");
        return false;
    }
};
