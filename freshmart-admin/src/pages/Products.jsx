import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_WITH_PAGINATION } from "../schema/Product";
import EmptyData from "../components/include/EmptyData";
import Progress from "../components/include/Progress";
import FooterPagination from "../components/include/FooterPagination";
import ConfirmDialog from "../components/menu/ConfirmDialog";

export default function Products() {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { loading, error, data } = useQuery(GET_PRODUCT_WITH_PAGINATION, {
    variables: { page, limit, Pagination: true, keyword },
  });

  const paginationData = data?.getProductWithPagination?.paginator;

  const handleLimit = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <Stack>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography>Search</Typography>
          <TextField
            fullWidth
            placeholder="Search products"
            size="small"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CiSearch size={25} color="#259525" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} textAlign="right">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/products/new")}
          >
            New product
          </Button>
        </Grid>
      </Grid>

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
            {loading ? (
              <Progress />
            ) : data?.getProductWithPagination?.data?.length === 0 ? (
              <EmptyData />
            ) : (
              data?.getProductWithPagination?.data?.map((p, index) => (
                <TableRow key={p._id}>
                  <TableCell>{paginationData?.slno ? paginationData.slno + index : index + 1}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => navigate(`/products/${p._id}`)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setConfirm({ open: true, id: p._id })}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={confirm.open}
        title="Delete product"
        onClose={() => setConfirm({ open: false, id: null })}
        onConfirm={() => console.log("Delete:", confirm.id)}
      />

      <Stack direction="row" justifyContent="flex-end">
        <FooterPagination
          page={page}
          limit={limit}
          setPage={setPage}
          handleLimit={handleLimit}
          totalDocs={paginationData?.totalDocs}
          totalPages={paginationData?.totalPages}
        />
      </Stack>
    </Stack>
  );
}
