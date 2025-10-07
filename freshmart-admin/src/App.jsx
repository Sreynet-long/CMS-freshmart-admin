import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductForm from './pages/ProductForm'
import Categories from './pages/Categories'
import Orders from './pages/Orders'


function App() {
return (
<Box sx={{ display: 'flex', minHeight: '100vh' }}>
<Sidebar />
<Box component="main" sx={{ flex: 1, p: 3 }}>
<Topbar />
<Routes>
<Route path="/" element={<Navigate to="/dashboard" replace />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/products" element={<Products />} />
<Route path="/products/new" element={<ProductForm />} />
<Route path="/products/:id" element={<ProductForm />} />
<Route path="/categories" element={<Categories />} />
<Route path="/orders" element={<Orders />} />
</Routes>
</Box>
</Box>
)
}


export default App