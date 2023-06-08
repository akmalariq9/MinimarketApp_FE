import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";

const DashboardHeader = ({ active }) => {
  //const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          {/* <img
            src="https://drive.google.com/uc?export=view&id=1QioROnX9kOS0bi7tuyViloAMbloj7jxL"
            alt=""
          /> */}
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/manager-all-sales" className="800px:block hidden">
          <FiShoppingBag
            color={`${active === 1 ? "crimson" : "#555"}`}
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to="/manager-all-purchase" className="800px:block hidden">
          <LuShoppingCart
            color={`${active === 2 ? "crimson" : "#555"}`}
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to="/manager-all-products" className="800px:block hidden">
          <FiPackage
            color={`${active === 3 ? "crimson" : "#555"}`}
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to="/manager-all-employee" className="800px:block hidden">
          <AiOutlineUser
            color={`${active === 4 ? "crimson" : "#555"}`}
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        <Link to="/manager-all-member" className="800px:block hidden">
          <MdOutlineVerified
            color={`${active === 5 ? "crimson" : "#555"}`}
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>
        {/* <Link to={`/shop/${seller._id}`}>
            <img
              src={`${backend_url}${seller.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
