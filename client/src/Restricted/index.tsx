import {
    FunctionComponent,
    ReactElement,
    cloneElement,
} from "react";

import { Alert } from "@mui/material";
import usePermissions from "../_Hooks/usePermissions.hook";

interface RestrictedProps {
    children: ReactElement;
    permission: string;
    type: "disabled" | "view" | "hide";
}

const Restricted: FunctionComponent<RestrictedProps> = ({
    permission,
    type,
    children,
}) => {
    const hasPermissions = usePermissions();
    // console.log("hasPermissions", hasPermissions, permission, hasPermissions(permission))
    const getRestrictedChild = () => {
        switch (type) {
            case "disabled":
                return cloneElement(children, { disabled: true });
            case "view":
                return (
                    <Alert severity="warning">
                        It seems like you don't have the necessary permissions to access
                        this page or feature
                    </Alert>
                );
            case "hide":
                return <></>;
        }
    };
    console.log(hasPermissions(permission))
    return !hasPermissions(permission) ? getRestrictedChild() : children;
};

export default Restricted;