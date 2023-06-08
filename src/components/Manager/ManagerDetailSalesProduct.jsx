import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import DeleteIco
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const ManagerDetailSalesProduct = () => {
  const location = useLocation();
  const [barang_id, setBarangId] = useState([]);
  const [data_barang, setDataBarang] = useState([]);
  const [barangs, setDataBarangs] = useState([]);
  const url = location.pathname.split("/")[2];

  // console.log(barangs)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/barang-transaksi-penjualan/transaksi/${url}`
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

  const handleDeleteItem = async (id) => {
    try {
      
      await axios.delete(
        `http://localhost:8000/barang-transaksi-penjualan/${id}`
      )
      window.location.reload();
      // fetchData(); // Refresh data setelah penghapusan berhasil
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Item Id on Transction",
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
      field: "delete",
      headerName: "Delete Item",
      width: 150,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleDeleteItem(params.row.id)}
        >
          <AiFillDelete />
        </IconButton>
      ),
    },
  ];

  const rows = [];

  data_barang.map((item, index) => {
    rows.push({
      id: barangs[index].id,
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
            Sales Transaction Details.
          </div>
          <Link to={`/manager-all-sales`}>
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

export default ManagerDetailSalesProduct;
