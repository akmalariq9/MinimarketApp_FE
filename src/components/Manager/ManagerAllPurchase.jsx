import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";

const ManagerAllPurchase = () => {
  const [data_transaksi, setDataTransaksi] = useState([]);
  const [supplier_id, setSupplierId] = useState([]);
  const [data_supplier, setDataSupplier] = useState([]);
  const [data_pegawai, setDataPegawai] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/transaksi-pembelian`
        );
        setDataTransaksi(response.data.data);

        const supplierIds = [
          ...new Set(response.data.data.map((item) => item.supplier_id)),
        ];
        setSupplierId(supplierIds);

        const pegawaiIds = [
          ...new Set(response.data.data.map((item) => item.pegawai_id)),
        ];

        const promises = supplierIds.map(async (supplierId) => {
          const response2 = await axios.get(
            `http://localhost:8000/supplier/${supplierId}`
          );
          return response2.data.data;
        });

        const promises2 = pegawaiIds.map(async (pegawaiId) => {
          const response3 = await axios.get(
            `http://localhost:8000/pegawai/${pegawaiId}`
          );
          return response3.data.data;
        });

        const fetchedDataSupplier = await Promise.all(promises);
        setDataSupplier(fetchedDataSupplier);
        setDataPegawai(await Promise.all(promises2));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      // width: 150,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "worker",
      headerName: "Employee",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "totalAmount",
      headerName: "Total",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "detailTransaction",
      headerName: "Detail",
      headerClassName: "super-app-theme--header",
      flex: 1,
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/barang-transaksi-pembelian/${params.id}`}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AiOutlineEye />}
              sx={{
                backgroundColor: "#8B5FBF",
                "&:hover": {
                  backgroundColor: "#61398F",
                },
                textTransform: "none",
              }}
            >
              View
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = data_transaksi.map((item) => {
    const supplier = data_supplier.find(
      (supplier) => supplier.id === item.supplier_id
    );
    const pegawai = data_pegawai.find(
      (pegawai) => pegawai.id === item.pegawai_id
    );
    return {
      id: item.id,
      createdAt:
        item.createdAt.split("T")[0] +
        " " +
        item.createdAt.split("T")[1].split("Z")[0],
      worker: pegawai ? pegawai.nama : "-",
      supplier: supplier ? supplier.nama : "-",
      totalAmount: item.total_transaksi_pembelian,
    };
  });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white mb-10">
        <div className="flex justify-between items-center font-Poppins font-bold text-[18px]">
        <div className="font-Poppins font-bold text-[18px]"
          style={{
            color: "#212121",
            fontSize: "36px",
            fontFamily: "Montserrat"
          }}
        >
          Purchase Transaction
        </div>
          <Button
            variant="contained"
            size="small"
            component={Link}
            startIcon={<AiOutlinePlusCircle />}
            to="/create-purchase-transaction"
            sx={{
              backgroundColor: "#8B5FBF",
              "&:hover": {
                backgroundColor: "#61398F",
              },
              textTransform: "none",
            }}
          >
            New Transaction
          </Button>
        </div>
        <br />
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

export default ManagerAllPurchase;
