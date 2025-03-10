
import { styled } from '@mui/system';
import { TableRow } from '@mui/material';

export const StyledTableRow = styled(TableRow)(({ theme }: { theme: any }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));