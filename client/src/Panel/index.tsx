import React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface PanelProps {
    title: string;
    actionables?: React.ReactNode;
    children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, actionables, children }) => {
    return (
        <Box pt={1} border={1} borderColor="grey.300" borderRadius={2} sx={{ backgroundColor: "grey.300" }}>
            <Box px={1} display="flex" justifyContent="space-between" alignItems="center" mb={0} >
                <Typography variant="h5" sx={{ color: "black.200" }}>{title}</Typography>
                <Box mx={2} pb={1}>
                    {actionables}
                </Box>
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default Panel;