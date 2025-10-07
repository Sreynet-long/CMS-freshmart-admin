import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import api from '../api/axios'


export default function Orders() {
const [orders, setOrders] = useState([])
useEffect(() => { api.get('/orders').then(r => setOrders(r.data)) }, [])
return (
<Paper sx={{ p: 2 }}>
    <Table>
        <TableHead>
            <TableRow><TableCell>ID</TableCell><TableCell>Customer</TableCell><TableCell>Total</TableCell></TableRow>
        </TableHead>
        <TableBody>
        {orders.map(o => (
            <TableRow key={o.id}><TableCell>{o.id}</TableCell><TableCell>{o.customer}</TableCell><TableCell>{o.total}</TableCell></TableRow>
        ))}
        </TableBody>
    </Table>
</Paper>
)
}