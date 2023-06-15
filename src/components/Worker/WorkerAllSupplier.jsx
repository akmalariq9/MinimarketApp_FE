import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const WorkerAllSupplier = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + `/supplier`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      // minWidth: 150,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },

    {
      field: "nama",
      headerName: "Name",
      // width: 250,
      // minWidth: 250,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },

    {
      field: "phoneNumber",
      headerName: "Phone Number",
      // width: 250,
      headerClassName: "super-app-theme--header",
      // minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      // minWidth: 250,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },

    {
      field: "createdAt",
      headerName: "Joined Date",
      // width: 150,
      // minWidth: 250,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
  ];

  const rows = [];

  data &&
    data.forEach((item) => {
      rows.push({
        id: item.id,
        createdAt:
          item.createdAt.split("T")[0] +
          " " +
          item.createdAt.split("T")[1].split("Z")[0],
        nama: item.nama,
        email: item.email,
        phoneNumber: item.no_telepon,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white mb-10">
        {" "}
        {/* Tambahkan margin bawah di sini */}
        <div
          className="font-Poppins font-bold text-[18px]"
          style={{
            color: "#212121",
            fontSize: "36px",
            fontFamily: "Montserrat",
          }}
        >
          Supplier
        </div>{" "}
        <br />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          sx={{
            borderRadius: "10px",
            "& .super-app-theme--header": {
              backgroundColor: "#8B5FBF",
              color: "white",
              fontStyle: "bold",
            },
          }}
        />
      </div>
    </>
  );
};

export default WorkerAllSupplier;
