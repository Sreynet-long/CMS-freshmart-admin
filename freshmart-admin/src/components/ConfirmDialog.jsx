import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'


export default function ConfirmDialog({ open, title, onClose, onConfirm }) {
return (
<Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained">Confirm</Button>
    </DialogActions>
</Dialog>
)
}