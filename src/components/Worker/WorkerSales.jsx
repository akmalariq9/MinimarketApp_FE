import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

const WorkerSales = () => {
  const auth = useSelector((state) => state.pegawai);
  const [data_transaksi, setDataTransaksi] = useState([]);
  const [member_id, setMemberId] = useState([]);
  const [data_member, setDataMember] = useState([]);
  const [data_pegawai, setDataPegawai] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/transaksi-penjualan/pegawai/${auth.id}`
        );
        setDataTransaksi(response.data.data);

        const memberIds = [
          ...new Set(response.data.data.map((item) => item.member_id)),
        ];
        setMemberId(memberIds);

        const promises = memberIds.map(async (memberId) => {
          const response2 = await axios.get(
            `http://localhost:8000/member/${memberId}`
          );
          return response2.data.data;
        });

        const fetchedDataMember = await Promise.all(promises);
        setDataMember(fetchedDataMember);
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
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Transaction Date",
      flex: 1,
    },
    {
      field: "memberName",
      headerName: "Member Name",
      flex: 1,
    },
    {
      field: "memberPoin",
      headerName: "Member Point",
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
          <Link to={`/barang-transaksi-penjualan/${params.id}`}>
            <Button
              variant="contained"
              size="small"
              startIcon={<BiPencil />}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = data_transaksi.map((item) => {
    const member = data_member.find((member) => member.id === item.member_id);
    return {
      id: item.id,
      createdAt:
        item.createdAt.split("T")[0] +
        " " +
        item.createdAt.split("T")[1].split("Z")[0],
      isMember: member ? "Yes" : "No",
      memberName: member ? member.nama : "-",
      memberPoin: member ? member.poin : "-",
      totalAmount: item.total_transaksi_penjualan,
    };
  });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="flex justify-between items-center font-Poppins font-bold text-[18px]">
          <div>All Sales History that You Serve.</div>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/create-sales-transaction"
          >
            Create Sales Transaction
          </Button>
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

export default WorkerSales;
