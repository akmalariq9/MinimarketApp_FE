import React, { useState } from "react";
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
  const [isManajemenOpen, setIsManajemenOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutPegawai(null));
  };

  const toggleManajemen = () => {
    setIsManajemenOpen(!isManajemenOpen);
  };

  return (
    <div className="h-screen bg-white shadow-sm sticky top-0 left-0 z-10">
      <div className="p-6">
        <Link to="/">
          <img
            src="https://drive.google.com/uc?export=view&id=1lIopMW2r-7VIwEm8UZBM3zJw5iHhQiZT"
            alt=""
            width={185}
            height={55}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </Link>
      </div>
      
      {/* Other menu items */}
      <div
        className={`w-full flex items-center p-4 ${
          active === 1 ? "bg-[#D6C6E1]" : "bg-white"
        }`}
      >
        <Link to="/manager-all-sales" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 1 ? "#61398F" : "#687083"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#61398F]" : "text-[#687083]"
            }`}
          >
            Sale Transactions
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 ${
          active === 2 ? "bg-[#D6C6E1]" : "bg-white"
        }`}
      >
        <Link to="/manager-all-purchase" className="w-full flex items-center">
          <LuShoppingCart
            size={30}
            color={`${active === 2 ? "#61398F" : "#687083"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#61398F]" : "text-[#687083]"
            }`}
          >
            Purchase Transactions
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 ${
          active === 3 ? "bg-[#D6C6E1]" : "bg-white"
        }`}
      >
        <Link to="/manager-all-products" className="w-full flex items-center">
          <FiPackage
            size={30}
            color={`${active === 3 ? "#61398F" : "#687083"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#61398F]" : "text-[#687083]"
            }`}
          >
            All Product
          </h5>
        </Link>
      </div>

      {/* Manajemen dropdown */}
      <div
        className={`w-full flex items-center p-4 cursor-pointer ${
          (active >= 4 && active <= 6) || isManajemenOpen ? "bg-[#E9E4ED]" : "bg-white"
        }`}
        onClick={toggleManajemen}
      >
        <AiOutlineSetting
          size={30}
          color={`${(active >= 4 && active <= 6) || isManajemenOpen ? "#61398F" : "#687083"}`}
        />
        <h5
          className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
            (active >= 4 && active <= 6) || isManajemenOpen ? "text-[#61398F]" : "text-[#687083]"
          }`}
        >
          Manajemen
        </h5>
      </div>
      
      {/* Manajemen dropdown content */}
      {(isManajemenOpen || active === 4 || active === 5) && (
        <div>
          <div
            className={`w-full flex items-center p-4 ${
              active === 4 ? "bg-[#D6C6E1]" : "bg-white"
            }`}
          >
            <Link to="/manager-all-employee" className="w-full flex items-center">
              <AiOutlineUser
                size={30}
                color={`${active === 4 ? "#61398F" : "#687083"}`}
                style={{ marginLeft: '32px' }}
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  active === 4 ? "text-[#61398F]" : "text-[#687083]"
                }`}
              >
                Employee
              </h5>
            </Link>
          </div>

          <div
            className={`w-full flex items-center p-4 ${
              active === 5 ? "bg-[#D6C6E1]" : "bg-white"
            }`}
          >
            <Link to="/manager-all-member" className="w-full flex items-center">
              <MdOutlineVerified
                size={30}
                color={`${active === 5 ? "#61398F" : "#687083"}`}
                style={{ marginLeft: '32px' }}
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  active === 5 ? "text-[#61398F]" : "text-[#687083]"
                }`}
              >
                Member
              </h5>
            </Link>
          </div>
        </div>
      )}

      {/* Logout button */}
      <button className="w-full flex items-center p-4" onClick={handleLogout}>
        <BiLogOut size={30} color={active === 6 ? "crimson" : "#555"} />
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
