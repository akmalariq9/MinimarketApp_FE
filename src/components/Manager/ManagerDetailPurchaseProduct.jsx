import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi"; 

const ManagerDetailPurchaseProduct = () => {
  const location = useLocation();
  const [barang_id, setBarangId] = useState([]);
  const [data_barang, setDataBarang] = useState([]);
  const [barangs, setDataBarangs] = useState([]);
  const [transaksi, setTransaksi] = useState([
    {
      "barang_id": null,
      "jumlah_barang": null,
    
    }
  ]);
  const url = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/barang-transaksi-pembelian/transaksi/${url}`
        );
        setDataBarangs(response.data.data);

        const barangIds = [
          ...new Set(response.data.data.map((item) => item.barang_id)),
        ];
        setBarangId(barangIds);

        const promises = barangIds.map(async (barangId) => {
          const response2 = await axios.get(
            `http://localhost:8000/barang/${barangId}`
          );
          return response2.data.data;
        });

        setDataBarang(await Promise.all(promises));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data_barang, "data transaksi");

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      flex: 1,
    },
    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "itemCount",
      headerName: "Number of Items",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price per Item",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total Price of Item",
      flex: 1,
    },
    {
      field: "editProduct",
      headerName: "Edit Product",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/barang-transaksi-penjualan/${params.id}`}>
            <Button
              variant="contained"
              size="small"
              startIcon={<BiPencil/>}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = [];
  data_barang.map((item, index) => {
    rows.push({
      id: item.id,
      itemName: item.nama,
      itemCount: barangs[index].jumlah_barang,
      price: item.harga,
      totalPrice: item.harga * barangs[index].jumlah_barang,
    });
  });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="font-Poppins font-bold text-[18px]">
            Purchase Transaction Details.
          </div>
          <Link to={`/manager-all-purchase`}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="font-Poppins font-bold text-[10px]"
            >
              Back
            </Button>
          </Link>
          <Link to={`/add-product/${url}`}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="font-Poppins font-bold text-[10px]"
            >
              Add Product
            </Button>
          </Link>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default ManagerDetailPurchaseProduct;