import React from 'react'
import ManagerDashboardHeader from '../../components/Layout/ManagerDashboardHeader'
import ManagerDashboardSidebar from '../../components/Layout/ManagerDashboardSidebar'
import ManagerAllProduct from '../../components/Manager/ManagerAllProduct'

const ManagerAllProductPage = () => {
  return (
    <div>
        <ManagerDashboardHeader active={3} />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ManagerDashboardSidebar active={3} />
            </div>
            <div className="w-full justify-center flex">
              <ManagerAllProduct />
            </div>
          </div>
    </div>
  )
}

export default ManagerAllProductPage
