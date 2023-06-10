import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import axios from "axios";

export default function WorkerPurchase() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/barang").then((res) => {
      setData(res.data.data);
      setFilteredData(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/jenis-barang").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
    const filteredByCategory =
      selectedCategory === "All Categories"
        ? data
        : data.filter((item) => item.jenis_barang_id === parseInt(selectedCategory));

    const filteredBySearch = filteredByCategory.filter((item) =>
      item.nama.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredData(filteredBySearch);
  }, [selectedCategory, searchValue, data]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nama",
      headerName: "Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "jumlah_stok",
      headerName: "Stock",
      flex: 1,
      headerClassName: "super-app-theme--header",
      cellClassName: (params) =>
        params.value < 20 ? "low-stock-cell" : "",
    },
    {
      field: "jenis_barang_id",
      headerName: "Category",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => getCategoryName(params.value),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  const getCategoryName = (categoryId) => {
    if (categoryId === "All Categories") {
      return categoryId;
    }
    const category = categories.find((item) => item.id === parseInt(categoryId));
    return category ? category.kategori : "";
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const rows = filteredData.map((item) => ({
    id: item.id,
    nama: item.nama,
    jumlah_stok: item.jumlah_stok,
    jenis_barang_id: item.jenis_barang_id,
    price: item.harga,
  }));

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white mb-10">
        <div
          className="font-Poppins font-bold text-[18px]"
          style={{
            color: "#212121",
            fontSize: "36px",
            fontFamily: "Montserrat",
          }}
        >
          Products
        </div>
        <br />
        <div className="flex">
          <FormControl
            variant="outlined"
            sx={{ minWidth: 200, marginBottom: "16px" }}
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="All Categories">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.kategori}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={handleSearchChange}
            sx={{ marginLeft: "16px" }}
          />
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          isRowSelectable={()=>false}
          autoHeight
          autoWidth
          getRowClassName={(params) =>
            params.row.jumlah_stok < 20 ? "low-stock-row" : ""
          }
          sx={{
            borderRadius: "10px",
            "& .super-app-theme--header": {
              backgroundColor: "#8B5FBF",
              color: "white",
              fontStyle: "bold",
            },
            "& .low-stock-cell": {
              backgroundColor: "#A64452",
              color: "white",
            },
            "& .low-stock-row": {
              backgroundColor: "#A64452",
              color: "white",
              "&:hover": {
                backgroundColor: "#A64455", // Menjaga warna latar belakang tetap merah saat dihover
              },
            },
          }}
        />
      </div>
    </>
  );
}
