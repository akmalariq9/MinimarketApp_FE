import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi"
import { useDispatch } from "react-redux";
import { logoutPegawai } from "../../redux/reducers/pegawaiSlice";

const WorkerDashboardSidebar = ({ active }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutPegawai(null));
  };

  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-sales-history" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Sales History
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-purchase-history" className="w-full flex items-center">
          <FiPackage size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Purchase History
          </h5>
        </Link>
      </div>

      <button
      className="w-full flex items-center p-4"
      onClick={handleLogout}
    >
      <BiLogOut
        size={30}
        color={active === 11 ? 'crimson' : '#555'}
      />
      <h5
        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
          active === 11 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        Logout
      </h5>
    </button>
    </div>
  );
};

export default WorkerDashboardSidebar
