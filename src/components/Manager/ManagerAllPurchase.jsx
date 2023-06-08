import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";

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
      headerName: "Transaction Id",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Transaction Date",
      flex: 1,
    },
    {
      field: "worker",
      headerName: "Responsible Officer",
      flex: 1,
    },
    {
      field: "supplier",
      headerName: "Supplier Name",
      flex: 1,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
    },
    {
      field: "detailTransaction",
      headerName: "Detail Transaction",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/barang-transaksi-pembelian/${params.id}`}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AiOutlineEye />}
              style={{ marginLeft: "10px" }}
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
    const pegawai = data_pegawai.find((pegawai) => pegawai.id === item.pegawai_id);
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
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <Link to={`/transaksi-baru`}>
            {/* <Button
              variant="contained"
              color="primary"
              size="small"
              className="font-Poppins font-bold text-[10px]"
            >
              New
            </Button> */}
          </Link>
        <div className="font-Poppins font-bold text-[18px]">
          All Purchase History.
        </div>
        <br />
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

export default ManagerAllPurchase;
