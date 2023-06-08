import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const ManagerAllSales = () => {
  const [data_transaksi, setDataTransaksi] = useState([]);
  const [member_id, setMemberId] = useState([]);
  const [data_member, setDataMember] = useState([]);
  const [data_pegawai, setDataPegawai] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/transaksi-penjualan`
        );
        setDataTransaksi(response.data.data);

        const memberIds = [
          ...new Set(response.data.data.map((item) => item.member_id)),
        ];
        setMemberId(memberIds);

        const pegawaiIds = [
          ...new Set(response.data.data.map((item) => item.pegawai_id)),
        ];

        const promises = memberIds.map(async (memberId) => {
          const response2 = await axios.get(
            `http://localhost:8000/member/${memberId}`
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
        setDataMember(fetchedDataSupplier);
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
      // flex: 1,
      width: 200,
    },
    {
      field: "worker",
      headerName: "Responsible Officer ID",
      // flex: 1,
      width: 200,
    },
    {
      field: "member",
      headerName: "Member ID",
      // flex: 1,
      width: 200,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      // flex: 1,
      width: 200,
    },
    {
      field: "detailTransaction",
      headerName: "Detail Transaction",
      width: 200,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/barang-transaksi-penjualan/${params.id}`}>
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
    const member = data_member.find((member) => member.id === item.member_id);
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
      member: member ? member.nama : "-",
      totalAmount: item.total_transaksi_penjualan,
    };
  });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white mb-10">
        <div className="font-Poppins font-bold text-[18px]">
          All Sales History.
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

export default ManagerAllSales;
