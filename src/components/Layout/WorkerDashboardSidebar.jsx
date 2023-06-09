import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logoutPegawai } from "../../redux/reducers/pegawaiSlice";
import { LuShoppingCart } from "react-icons/lu";
import logo from "../../../src/img/logo.png";

const WorkerDashboardSidebar = ({ active }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutPegawai(null));
  };

  return (
    <div className="h-screen bg-white shadow-sm sticky top-0 left-0 z-10"
      style={{
        borderRight: "2px solid #D6C6E1"
      }}
    >
      <div className="p-6"
        style={{
          marginTop: "24px",
          marginBottom: "24px"
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt=""
            width={185}
            height={55}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </Link>
      </div>

      {/* single item */}
      <div
        className={`w-full flex items-center p-4 ${
          active === 1 ? "bg-[#D6C6E1]" : "bg-white"
        }`}
      >
        <Link
          to="/sales-history"
          className="w-full flex items-center"
        >
          <FiShoppingBag
            size={30}
            color={`${active === 1 ? "#61398F" : "#687083"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#61398F]" : "text-[#687083]"
            }`}
          >
            Sales Transactions
          </h5>
        </Link>
      </div>

      <div  className={`w-full flex items-center p-4 ${
          active === 2 ? "bg-[#D6C6E1]" : "bg-white"
        }`}
      >
        <Link
          to="/purchase-history"
          className="w-full flex items-center"
        >
          <LuShoppingCart size={30} color={`${active === 2 ? "#61398F" : "#687083"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#61398F]" : "text-[#687083]"
            }`}
          >
            Purchase Transactions
          </h5>
        </Link>
      </div>

      <div  className={`w-full flex items-center p-4 ${
          active === 3 ? "bg-[#D6C6E1]" : "bg-white"
        }`}
      >
        <Link
          to="/all-product"
          className="w-full flex items-center"
        >
          <FiPackage size={30} color={`${active === 3 ? "#61398F" : "#687083"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#61398F]" : "text-[#687083]"
            }`}
          >
            Products
          </h5>
        </Link>
      </div>

      <button className="w-full flex items-center p-4" onClick={handleLogout}>
        <BiLogOut size={30} color={active === 11 ? "crimson" : "#555"} />
        <h5
          className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
            active === 11 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          Logout
        </h5>
      </button>
    </div>
  );
};

export default WorkerDashboardSidebar;
