import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logoutPegawai } from "../../redux/reducers/pegawaiSlice";

const ManagerDashboardSidebar = ({ active }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutPegawai(null));
  };
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/manager-all-sales" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Sales
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/manager-all-purchase" className="w-full flex items-center">
          <LuShoppingCart 
            size={30} 
            color={`${active === 2 ? "crimson" : "#555"}`} 
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Purchase
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/manager-all-products" className="w-full flex items-center">
          <FiPackage 
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/manager-all-employee" className="w-full flex items-center">
          <AiOutlineUser
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Employee
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/manager-all-member" className="w-full flex items-center">
          <MdOutlineVerified
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Member
          </h5>
        </Link>
      </div>

      {/* <div className="w-full flex items-center p-4">
        <Link to="/manager-setting" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Setting
          </h5>
        </Link>
      </div> */}

      <button className="w-full flex items-center p-4" onClick={handleLogout}>
        <BiLogOut 
          size={30} 
          color={active === 6 ? "crimson" : "#555"} />
        <h5
          className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
            active === 6 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          Logout
        </h5>
      </button>
    </div>
  );
};

export default ManagerDashboardSidebar;
