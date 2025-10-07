import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'


export default function ProductForm() {
const { id } = useParams()
const navigate = useNavigate()
const [values, setValues] = useState({ name: '', price: 0, stock: 0, description: '' })


useEffect(() => {
if (id) load()
}, [id])


async function load() {
const res = await api.get(`/products/${id}`)
setValues(res.data)
}


async function handleSubmit(e) {
e.preventDefault()
if (id) await api.put(`/products/${id}`, values)
else await api.post('/products', values)
navigate('/products')
}


return (
<Paper sx={{ p: 2 }}>
    <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" value={values.name} onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))} sx={{ mb: 2 }} />
        <TextField fullWidth type="number" label="Price" value={values.price} onChange={(e) => setValues(v => ({ ...v, price: Number(e.target.value) }))} sx={{ mb: 2 }} />
        <TextField fullWidth type="number" label="Stock" value={values.stock} onChange={(e) => setValues(v => ({ ...v, stock: Number(e.target.value) }))} sx={{ mb: 2 }} />
        <TextField fullWidth multiline rows={4} label="Description" value={values.description} onChange={(e) => setValues(v => ({ ...v, description: e.target.value }))} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" type="submit">Save</Button>
            <Button variant="outlined" onClick={() => navigate('/products')}>Cancel</Button>
        </Box>
    </form>
</Paper>
)
}