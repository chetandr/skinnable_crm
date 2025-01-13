import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import CustomJwtPayload from "./_customJWTTOken";

export default function usePermissions() {
  const [actions, setActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log("token", decoded); // Decode the token
        setLoading(false);
        setActions(decoded.acl ? decoded.acl as string[] : []);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setActions([]);
      }
    } else {
      setActions([]);
    }

  }, [token]);

  console.log("actions", actions);

  if (loading) {
    return () => false; // Return a function that always returns false while loading
  }

  return (permission: string) => {
    console.log(actions);
    return actions.indexOf(permission) > -1;
  };
}