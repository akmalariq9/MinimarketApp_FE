import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  //const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="https://drive.google.com/uc?export=view&id=1lIopMW2r-7VIwEm8UZBM3zJw5iHhQiZT"
            alt=""
            width={185}
            height={55}
          />
        </Link>
      </div>
      <div className="flex items-center">
          <Link to="/sales-history" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/purchase-history" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
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
