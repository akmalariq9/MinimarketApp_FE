import React from "react";
import pattern from "../../../src/img/dashboardai-01.png";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector((state) => state.pegawai);
  const nama = auth.nama;
  const email = auth.email;

  return (
    <div className="w-full flex flex-col mt-8">
      <div className="mx-8" 
      style={{
        color: "#212121",
        fontSize: "36px",
        fontFamily: "Montserrat",
        fontWeight: "700",
      }}>
        Dashboard.
      </div>
      <div className="w-full flex">
        <div
          className="relative w-full bg-gray-200 h-32 mx-8 rounded-2xl shadow mt-2"
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            backgroundImage: `url(${pattern})`,
            backgroundSize: "cover",
          }}
        >
          <div
            className="font-Poppins"
            style={{ fontSize: "24px", fontWeight: "700", color: "#163354", marginLeft: "144px" }}
          >
            Selamat Datang Kembali, {auth.nama}
          </div>
        </div>
      </div>

      <div className="w-full mt-8 flex">
        <div
          className="relative w-full bg-gray-200 h-64 mx-8 rounded-2xl shadow"
          style={{
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <div
            className="font-Poppins"
            style={{ 
              marginLeft: "16px",
              marginTop: "4px",
              fontSize: "24px", 
              fontWeight: "700", 
              color: "#163354" }}
          >
            Detail Informasi:
            <br/>
            Nama: {auth.nama}
            <br/>
            Email: {auth.role}
          </div>
        </div>
      </div>

      <div className="w-full flex">
        <div
          className="relative w-full bg-gray-200 h-24 mx-8 rounded-2xl shadow mt-8"
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            backgroundImage: `url(${pattern})`,
            backgroundSize: "cover",
          }}
        >
          <div
            className="font-Poppins"
            style={{ fontSize: "24px", fontWeight: "700", color: "#163354", marginLeft: "144px" }}
          >
            Selamat Datang Kembali, {auth.nama}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
