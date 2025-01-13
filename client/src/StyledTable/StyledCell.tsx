import { styled } from '@mui/system';
import { TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    '&.MuiTableCell-body': {
        fontSize: 14,
    },
}));

