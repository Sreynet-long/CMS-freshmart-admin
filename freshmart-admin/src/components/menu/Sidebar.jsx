import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CategoryIcon from '@mui/icons-material/Category'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { Link as RouterLink, useLocation } from 'react-router-dom'


const drawerWidth = 240


export default function Sidebar() {
const location = useLocation()
const items = [
{ text: 'Dashboard', icon: <DashboardIcon />, to: '/dashboard' },
{ text: 'Products', icon: <StorefrontIcon />, to: '/products' },
{ text: 'Categories', icon: <CategoryIcon />, to: '/categories' },
{ text: 'Orders', icon: <ReceiptIcon />, to: '/orders' },
]


return (
<Drawer variant="permanent" sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth } }}>
    <Toolbar />
    <List>
        {items.map(i => (
        <ListItemButton key={i.text} component={RouterLink} to={i.to} selected={location.pathname.startsWith(i.to)}>
            <ListItemIcon>{i.icon}</ListItemIcon>
            <ListItemText primary={i.text} />
        </ListItemButton>
        ))}
    </List>
</Drawer>
)
}