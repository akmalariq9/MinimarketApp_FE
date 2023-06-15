import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

const WorkerAllMember = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + `/member`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  useEffect(() => {
    const filteredRows = data.filter((item) => {
      // Ganti properti berikut dengan properti yang sesuai di objek 'item' dalam 'data'
      return (
        item.no_telepon && item.no_telepon.toString().includes(searchValue)
      );
    });
    setFilteredData(filteredRows);
  }, [data, searchValue]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const formatPhoneNumber = (phoneNumber) => {
    return "0" + phoneNumber;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "nama",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "no_telepon",
      headerName: "Phone Number",
      headerClassName: "super-app-theme--header",
      flex: 1,
      valueFormatter: (params) => formatPhoneNumber(params.value),
    },
    {
      field: "poin",
      headerName: "Points",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Joined Date",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
  ];

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white mb-10">
        <div
          className="font-Poppins font-bold text-[18px]"
          style={{
            color: "#212121",
            fontSize: "36px",
            fontFamily: "Montserrat",
          }}
        >
          Member
        </div>{" "}
        <br />
        <div className="mb-4">
          <TextField
            label="Search by Phone Number"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={handleSearchChange}
            inputProps={{ style: { height: "24px" } }}
            sx={{ width: 230 }}
          />
        </div>
        <DataGrid
          rows={filteredData}
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

export default WorkerAllMember;
