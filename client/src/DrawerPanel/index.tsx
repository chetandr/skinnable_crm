import React from 'react';
import { Box, Drawer, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DrawerPanelProps {
    title: string;
    actionables?: React.ReactNode;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    bottomActionables?: React.ReactNode;
    ctas?: React.ReactNode;
}

const DrawerPanel: React.FC<DrawerPanelProps> = ({ title, actionables, children, open, onClose, bottomActionables, ctas }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: '80%' },
            }}
        >
            <Box p={1} sx={{ marginTop: { xs: 1, sm: 8 } }} display="flex" justifyContent="space-between" alignItems="center" borderBottom={1} borderColor="grey.300">
                <Typography variant="h6">{title}</Typography>
                <Box display="flex" alignItems="center">
                    {actionables}
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box p={2} flexGrow={1}>
                {children}
            </Box>
            <Box p={2} display="flex" justifyContent="space-between" alignItems="center" borderTop={1} borderColor="grey.300">
                <Box>
                    {bottomActionables}
                </Box>
                <Box>
                    {ctas}
                </Box>
            </Box>
        </Drawer>
    );
};

export default DrawerPanel;