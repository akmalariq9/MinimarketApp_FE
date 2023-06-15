import React, { useState } from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logoutPegawai } from "../../redux/reducers/pegawaiSlice";
import { TbTruckLoading } from "react-icons/tb";
import { IoIosArrowDropdown } from "react-icons/io";

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
    <div
      className="h-screen bg-white shadow-sm sticky top-0 left-0 z-10"
      style={{
        borderRight: "2px solid #D6C6E1",
      }}
    >
      <div
        className="p-6"
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <Link to="/">
          <img
            src="/img/logo.png"
            alt=""
            width={185}
            height={55}
            style={{ marginLeft: "auto", marginRight: "auto"}}
          />
        </Link>
      </div>

      {/* single item */}
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
            style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: "600",
              marginLeft: "8px",
            }}
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
            style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: "600",
              marginLeft: "8px",
            }}
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
            style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: "600",
              marginLeft: "8px",
            }}
          >
            Products
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
    style={{
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: "600",
      marginLeft: "8px",
    }}
  >
    Management
  </h5>
  <IoIosArrowDropdown
    size={24}
    color={`${(active >= 4 && active <= 6) || isManajemenOpen ? "#61398F" : "#687083"}`}
    style={{
      marginLeft: "64",
      transform: isManajemenOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease-in-out",
    }}
  />
</div>


      {/* Manajemen dropdown content */}
      {(isManajemenOpen || active === 4 || active === 5 || active == 6) && (
        <div>
          <div
            className={`w-full flex items-center p-4 ${
              active === 4 ? "bg-[#D6C6E1]" : "bg-white"
            }`}
          >
            <Link
              to="/manager-all-employee"
              className="w-full flex items-center"
            >
              <AiOutlineUser
                size={30}
                color={`${active === 4 ? "#61398F" : "#687083"}`}
                style={{ marginLeft: "32px" }}
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  active === 4 ? "text-[#61398F]" : "text-[#687083]"
                }`}
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
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
                style={{ marginLeft: "32px" }}
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  active === 5 ? "text-[#61398F]" : "text-[#687083]"
                }`}
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
              >
                Member
              </h5>
            </Link>
          </div>

          <div
            className={`w-full flex items-center p-4 ${
              active === 6 ? "bg-[#D6C6E1]" : "bg-white"
            }`}
          >
            <Link
              to="/manager-all-supplier"
              className="w-full flex items-center"
            >
              <TbTruckLoading
                size={30}
                color={`${active === 6 ? "#61398F" : "#687083"}`}
                style={{ marginLeft: "32px" }}
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  active === 6 ? "text-[#61398F]" : "text-[#687083]"
                }`}
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
              >
                Supplier
              </h5>
            </Link>
          </div>
        </div>
      )}

      <button className="w-full flex items-center p-4" onClick={handleLogout}>
        <BiLogOut size={30} color={active === 7 ? "crimson" : "#687083"} />
        <h5
          className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
            active === 7 ? "text-[#61398F]" : "text-[#687083]"
          }`}
          style={{
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontWeight: "600",
            marginLeft: "8px",
          }}
        >
          Logout
        </h5>
      </button>
    </div>
  );
};

export default ManagerDashboardSidebar;
