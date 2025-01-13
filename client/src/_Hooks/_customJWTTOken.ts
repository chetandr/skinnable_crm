export default interface CustomJwtPayload {
    role?: string;
    acl?: {
        canEdit?: boolean;
        canDelete?: boolean;
        canViewReports?: boolean;
    };
    exp?: number; // Expiry time (Unix timestamp)
}