import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const ManagerAllMember = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/member`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Member Id",
      width: 150,
      // flex: 1,
    },


    {
      field: "nama",
      headerName: "Name",
      // width: 250,
      flex: 1,
    },

    {
      field: "phoneNumber",
      headerName: "Phone Number",
      // width: 130,
      flex: 1,
    },
    {
      field: "poin",
      headerName: "Points",
      // width: 230,
      flex: 1,
    },

    {
      field: "createdAt",
      headerName: "Joined Date",
      // width: 150,
      flex: 1,
    },
  ];

  const rows = [];

  data &&
  data.forEach((item) => {
      rows.push({
        id: item.id,
        createdAt: item.createdAt.split("T")[0] + " " + item.createdAt.split("T")[1].split("Z")[0],
        nama: item.nama,
        phoneNumber: item.no_telepon,
        poin: item.poin,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="font-Poppins font-bold text-[18px]">
          All Joined Member.
        </div>{" "}
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

export default ManagerAllMember;
