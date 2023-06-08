import React from 'react'
import ManagerDashboardHeader from '../../components/Layout/ManagerDashboardHeader'
import ManagerDashboardSidebar from '../../components/Layout/ManagerDashboardSidebar'
import ManagerAllPurchase from '../../components/Manager/ManagerAllPurchase'

const ManagerAllPurchasePage = () => {
  return (
    <div>
        <ManagerDashboardHeader active={2} />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ManagerDashboardSidebar active={2} />
            </div>
            <div className="w-full justify-center flex">
              <ManagerAllPurchase />
            </div>
          </div>
    </div>
  )
}

export default ManagerAllPurchasePage
