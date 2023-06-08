import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logoutPegawai } from "../../redux/reducers/pegawaiSlice";

const WorkerDashboardSidebar = ({ active }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutPegawai(null));
  };

  return (
    <div className="h-screen bg-white shadow sticky top-0 left-0 z-10">
      <div className="p-6">
        <Link to="/">
          <img
            src="https://drive.google.com/uc?export=view&id=1lIopMW2r-7VIwEm8UZBM3zJw5iHhQiZT"
            alt=""
            width={185}
            height={55}
            style={{ marginLeft: "auto", marginRight: "auto" }}
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
            Sales History
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
          <FiPackage size={30} color={`${active === 2 ? "#61398F" : "#687083"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#61398F]" : "text-[#687083]"
            }`}
          >
            Purchase History
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
