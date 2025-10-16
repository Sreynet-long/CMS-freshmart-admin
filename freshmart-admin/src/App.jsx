import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Topbar from "./components/menu/Topbar";
import Sidebar from "./components/menu/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

function App() {
  // GlobalDebug();
  // ====================== set token =======================
  const token = window.localStorage.getItem("token");
  const httpLink = createHttpLink({
    // uri: process.env.REACT_APP_END_POINT,
    uri: "http://192.168.5.37:6380/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        // authorization: token ? token : "",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODlhZjUxNGU4YmE4YTY4NmNlMmNmZDciLCJpYXQiOjE3NTQ5ODY0NjksImV4cCI6MTc1NzU3ODQ2OX0.z15Puici1mSPRbmKUgcu8CClWmWzvZ3Lfbc4geWfxPA",
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
  );
}

export default App;
