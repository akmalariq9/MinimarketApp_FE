import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

const WorkerSales = () => {
  const auth = useSelector((state) => state.pegawai);
  const [data_transaksi, setDataTransaksi] = useState([]);
  const [member_id, setMemberId] = useState([]);
  const [data_member, setDataMember] = useState([]);

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
      headerName: "ID",
      headerClassName : "super-app-theme--header",
      // width: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      headerClassName : "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "memberName",
      headerName: "Member",
      headerClassName : "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "memberPoin",
      headerName: "Point",
      headerClassName : "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "totalAmount",
      headerName: "Total",
      headerClassName : "super-app-theme--header",
      flex: 1,
      // width: 200,
    },
    {
      field: "detailTransaction",
      headerName: "Detail",
      headerClassName : "super-app-theme--header",
      flex: 1,
      // width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/barang-transaksi-penjualan/${params.id}`}>
            <Button
              variant="contained"
              size="small"
              startIcon={<BiPencil />}
              // style={{ marginLeft: "10px" }}
              sx={{
                backgroundColor: "#8B5FBF",
                "&:hover": {
                  backgroundColor: "#61398F",
                },
                textTransform: "none",
              }}
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
          <div className="font-bold" style={{
            fontFamily: "Montserrat",
            fontSize: "36px",
          }}>
            Sales Transactions.
            </div>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/create-sales-transaction"
            startIcon={<AiOutlinePlusCircle />}
            sx={{
              backgroundColor: "#8B5FBF",
              "&:hover": {
                backgroundColor: "#61398F",
              },
              textTransform: "none",
            }}
          >
            Create Transaction
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

export default WorkerSales;
