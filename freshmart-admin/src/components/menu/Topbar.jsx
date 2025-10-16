import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'


export default function Topbar() {
const [anchorEl, setAnchorEl] = React.useState(null)
const handleOpen = (e) => setAnchorEl(e.currentTarget)
const handleClose = () => setAnchorEl(null)


return (
<AppBar position="static" color="success" elevation={0} sx={{ mb: 2 }}>
    <Toolbar >
    <Typography variant="h6" sx={{ flex: 1 }}>Freshmart Admin</Typography>
        <Box>
            <IconButton onClick={handleOpen} size="small">
            <Avatar>AD</Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        </Box>
    </Toolbar>
</AppBar>
)
}