import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

const ManagerDetailSalesProduct = () => {
  const location = useLocation();
  const [barang_id, setBarangId] = useState([]);
  const [data_barang, setDataBarang] = useState([]);
  const [barangs, setDataBarangs] = useState([]);
  const url = location.pathname.split("/")[2];
  const auth = useSelector((state) => state.pegawai);
  const role = auth.role;
  
  let linkUrl;
  if (role === 1){
    linkUrl = '/manager-all-sales';
  } else if (role === 2){
    linkUrl = '/sales-history';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + `/barang-transaksi-penjualan/transaksi/${url}`
        );
        setDataBarangs(response.data.data);

        const barangIds = [
          ...new Set(response.data.data.map((item) => item.barang_id)),
        ];
        setBarangId(barangIds);

        const promises = barangIds.map(async (barangId) => {
          const response2 = await axios.get(
            process.env.REACT_APP_API_URL + `/barang/${barangId}`
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
        process.env.REACT_APP_API_URL + `/barang-transaksi-penjualan/${id}`
      );
      window.location.reload();
      // fetchData(); // Refresh data after successful deletion
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Item Id on Transaction",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "itemName",
      headerName: "Item Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "itemCount",
      headerName: "Number of Items",
      headerClassName: "super-app-theme--header",
      // width: 250,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price per Item",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total Price of Item",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete Item",
      headerClassName: "super-app-theme--header",
      // width: 150,
      flex: 1,
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
          <div className="space-x-4">
            <Link to={linkUrl}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="font-Poppins font-bold text-[10px]"
                sx={{
                  backgroundColor: "#8B5FBF",
                  "&:hover": {
                    backgroundColor: "#61398F",
                  },
                  textTransform: "none",
                }}
              >
                Back
              </Button>
            </Link>
            <Link to={`/add-sales-product/${url}`}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="font-Poppins font-bold text-[10px]"
                sx={{
                  backgroundColor: "#8B5FBF",
                  "&:hover": {
                    backgroundColor: "#61398F",
                  },
                  textTransform: "none",
                }}
              >
                Add Product
              </Button>
            </Link>
          </div>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          sx={{
            borderRadius: "10px",
            '& .super-app-theme--header': {
              backgroundColor: '#8B5FBF',
              color: 'white',
              fontStyle: 'bold',
            }
          }} 
        />
      </div>
    </>
  );
};

export default ManagerDetailSalesProduct;
