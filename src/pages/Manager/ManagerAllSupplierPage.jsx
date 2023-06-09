import React from 'react'
import ManagerAllSales from '../../components/Manager/ManagerAllSales'
import ManagerAllSupplier from '../../components/Manager/ManagerAllSupplier'
import ManagerDashboardHeader from '../../components/Layout/ManagerDashboardHeader'
import ManagerDashboardSidebar from '../../components/Layout/ManagerDashboardSidebar'

const ManagerAllSupplierPage = () => {
  return (
    <div>
    {/* <ManagerDashboardHeader active={1}/> */}
    <div className="flex justify-between w-full">
        {/* <div className="w-[80px] 800px:w-[330px]"> */}
          <ManagerDashboardSidebar active={6} />
        {/* </div> */}
        <div className="w-full justify-center flex">
          <ManagerAllSupplier />
        </div>
      </div>
</div>
  )
}

export default ManagerAllSupplierPage
