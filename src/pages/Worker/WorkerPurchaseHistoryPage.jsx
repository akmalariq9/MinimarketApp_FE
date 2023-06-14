import React from 'react'
import DashboardHeader from '../../components/Layout/WorkerDashboardHeader'
import WorkerDashboardSidebar from '../../components/Layout/WorkerDashboardSidebar'
import WorkerPurchase from '../../components/Worker/WorkerPurchase'

const WorkerPurchaseHistory = () => {
  return (
    <div>
        <div className="flex justify-between w-full">
            {/* <div className="w-[80px] 800px:w-[330px]"> */}
              <WorkerDashboardSidebar active={2} />
            {/* </div> */}
            <div className="w-full justify-center flex">
              <WorkerPurchase />
            </div>
          </div>
    </div>
  )
}

export default WorkerPurchaseHistory
