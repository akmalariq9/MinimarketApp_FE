import React from 'react'
import DashboardHeader from '../../components/Layout/WorkerDashboardHeader'
import WorkerDashboardSidebar from '../../components/Layout/WorkerDashboardSidebar'
// import WorkerPurchase from '../../components/Worker/WorkerPurchase'
import WorkerAllProduct from '../../components/Worker/WorkerAllProduct'

const WorkerPurchaseHistory = () => {
  return (
    <div>
        {/* <DashboardHeader /> */}
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <WorkerDashboardSidebar active={3} />
            </div>
            <div className="w-full justify-center flex">
              <WorkerAllProduct />
            </div>
          </div>
    </div>
  )
}

export default WorkerPurchaseHistory
