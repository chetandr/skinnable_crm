
import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper } from '@mui/material';
import Restricted from '../Restricted';
import { Navigate, useNavigate } from 'react-router-dom';

interface LeftMenuProps {
    handleDrawerToggle: () => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ handleDrawerToggle }) => {
    const navigate = useNavigate()
    function navigateTo(path: string) {
        navigate(path);
        handleDrawerToggle();
    }
    return (
        <Box sx={{ width: '100%', marginTop: { xs: 7, sm: 8 } }} role="presentation">
            <Restricted permission='read_master' type='hide'>
                <MenuList sx={{ fontSize: ".75rem" }}>
                    <MenuItem onClick={() => navigateTo('/crm/dashboard')} sx={{ fontWeight: "400", paddingLeft: 3 }}>
                        Dashboard
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{ fontWeight: "800" }}>
                        Masters
                    </MenuItem>
                    <MenuItem onClick={() => navigateTo('/crm/stages')} sx={{ fontWeight: "400", paddingLeft: 3 }}>
                        Stages
                    </MenuItem>
                    <MenuItem onClick={() => navigateTo('/crm/industires')} sx={{ fontWeight: "400", paddingLeft: 3 }}>
                        Industries
                    </MenuItem>
                </MenuList>
            </Restricted>
        </Box>
    );
}

export default LeftMenu;