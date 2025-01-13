import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import CustomJwtPayload from "./_customJWTTOken";
// Define the structure of the JWT payload


const useJwtDecoder = () => {
    const [decodedToken, setDecodedToken] = useState<CustomJwtPayload | null>(null);
    const [isExpired, setIsExpired] = useState<boolean>(false);

    // Helper function to check if the token is expired
    const isTokenExpired = (exp?: number): boolean => {
        if (!exp) return false;
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return currentTime > exp;
    };

    useEffect(() => {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        if (token) {
            try {
                const decoded = jwtDecode<CustomJwtPayload>(token); // Decode the token
                setDecodedToken(decoded);
                setIsExpired(isTokenExpired(decoded.exp)); // Check if the token is expired
            } catch (error) {
                console.error("Failed to decode token:", error);
                setDecodedToken(null);
                setIsExpired(true);
            }
        } else {
            setDecodedToken(null);
            setIsExpired(true);
        }
    }, []); // Effect runs once when the component mounts

    return { decodedToken, isExpired };
};

export default useJwtDecoder;