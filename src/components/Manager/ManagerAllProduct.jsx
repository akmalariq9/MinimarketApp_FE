import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

export default function WorkerPurchase() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/barang").then((res) => {
      setData(res.data.data);
      setFilteredData(res.data.data);
    });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      width: 100,
      // flex: 1,
    },
    {
      field: "nama",
      headerName: "Name",
      // flex: 1,
      width: 550
    },
    {
      field: "jumlah_stok",
      headerName: "Stock",
      // flex: 1,
      width: 150,
    },
    {
      field: "jenis_barang_id",
      headerName: "Category",
      // flex: 1,
      // width: 150,
      width: 150
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      // flex: 1,
    },
  ];

  const categories = [...new Set(data.map((item) => item.jenis_barang_id))];
  categories.unshift("All Categories");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === "All Categories") {
      setFilteredData(data);
    } else {
      const filteredData = data.filter(
        (item) => item.jenis_barang_id === parseInt(selectedCategory)
      );
      setFilteredData(filteredData);
    }
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
      <div className="w-full mx-8 pt-1 mt-10 bg-white mb-10"> {/* Tambahkan margin bawah di sini */}
        <div className="font-Poppins font-bold text-[18px]">
          All Available Products.
        </div>
        <br />
        <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: "16px" }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          autoWidth
        />
      </div>
    </>
  );
}