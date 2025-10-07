import React, { useEffect, useState } from 'react'
import { Box, Button, List, ListItem, ListItemText, TextField, Paper } from '@mui/material'
import api from '../api/axios'


export default function Categories() {
const [categories, setCategories] = useState([])
const [name, setName] = useState('')


useEffect(() => { fetchCategories() }, [])
async function fetchCategories() {
const res = await api.get('/categories')
setCategories(res.data)
}


async function handleAdd() {
await api.post('/categories', { name })
setName('')
fetchCategories()
}


return (
<Paper sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField label="New category" value={name} onChange={e => setName(e.target.value)} />
        <Button onClick={handleAdd} variant="contained">Add</Button>
    </Box>
    <List>
    {categories.map(c => (
        <ListItem key={c.id}><ListItemText primary={c.name} /></ListItem>
    ))}
    </List>
</Paper>
)
}