import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import api from '../api/axios'


export default function Dashboard() {
const [summary, setSummary] = useState({ orders: 0, products: 0, users: 0 })


useEffect(() => {
async function load() {
try {
const [orders, products, users] = await Promise.all([
api.get('/orders'),
api.get('/products'),
api.get('/users'),
])
setSummary({ orders: orders.data.length, products: products.data.length, users: users.data.length })
} catch (err) {
console.error(err)
}
}
load()
}, [])


return (
<Grid container spacing={2}>
    <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">{summary.orders}</Typography>
        </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
    <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Products</Typography>
        <Typography variant="h4">{summary.products}</Typography>
    </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
    <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Users</Typography>
        <Typography variant="h4">{summary.users}</Typography>
    </Paper>
    </Grid>
</Grid>
)
}