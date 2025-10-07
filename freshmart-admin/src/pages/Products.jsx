import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import ConfirmDialog from '../components/ConfirmDialog'


export default function Products() {
const [products, setProducts] = useState([])
const [confirm, setConfirm] = useState({ open: false, id: null })
const navigate = useNavigate()


useEffect(() => {
fetchProducts()
}, [])


async function fetchProducts() {
const res = await api.get('/products')
setProducts(res.data)
}


async function handleDelete(id) {
await api.delete(`/products/${id}`)
setConfirm({ open: false, id: null })
fetchProducts()
}


return (
<Box>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/products/new')}>New product</Button>
    </Box>


    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {products.map(p => (
                <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => navigate(`/products/${p.id}`)}><EditIcon/></IconButton>
                        <IconButton onClick={() => setConfirm({ open: true, id: p.id })}><DeleteIcon/></IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>


    <ConfirmDialog open={confirm.open} title="Delete product" onClose={() => setConfirm({ open: false, id: null })} onConfirm={() => handleDelete(confirm.id)} />
</Box>
)
}