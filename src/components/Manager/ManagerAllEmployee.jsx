import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

const ManagerAllEmployee = () => {
  const [data, setData] = useState([]);
  const [selectedWorkField, setSelectedWorkField] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/pegawai`).then((res) => {
      setData(res.data.data);
      setFilteredData(res.data.data);
    });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Employee Id",
      // width: 150,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "createdAt",
      headerName: "Accepted Date",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 250,
    },
    {
      field: "nama",
      headerName: "Employee Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 250,

    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 250,
    },
    {
      field: "workfield",
      headerName: "Work Field",
      headerClassName: "super-app-theme--header",
      flex: 1,
      // width: 250,
    },
  ];

  const workFields = [...new Set(data.map((item) => item.bidang_kerja_id))];
  workFields.unshift("All");

  const handleWorkFieldChange = (event) => {
    const selectedWorkField = event.target.value;
    setSelectedWorkField(selectedWorkField);

    if (selectedWorkField === "All") {
      setFilteredData(data);
    } else {
      const filteredData = data.filter(
        (item) => item.bidang_kerja_id === parseInt(selectedWorkField)
      );
      setFilteredData(filteredData);
    }
  };

  const rows = filteredData.map((item) => ({
    id: item.id,
    createdAt:
      item.createdAt.split("T")[0] + " " + item.createdAt.split("T")[1].split("Z")[0],
    nama: item.nama ? item.nama : "-",
    email: item.email,
    workfield: item.bidang_kerja_id === 1 ? "Manager" : "Staff",
    updatedAt:
      item.updatedAt.split("T")[0] + " " + item.updatedAt.split("T")[1].split("Z")[0],
  }));

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white mb-10"> {/* Tambahkan margin bawah di sini */}
        <div className="font-Poppins font-bold text-[18px]">
          All Employee in SakinahMart.
        </div>
        <br />
        <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: "16px" }}>
          <InputLabel id="workfield-label">Work Field</InputLabel>
          <Select
            labelId="workfield-label"
            id="workfield"
            value={selectedWorkField}
            onChange={handleWorkFieldChange}
            label="Work Field"
          >
            {workFields.map((field) => (
              <MenuItem key={field} value={field}>
                {field === "All" ? "All" : `${field}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default ManagerAllEmployee;