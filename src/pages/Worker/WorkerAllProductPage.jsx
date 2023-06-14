import React from 'react'
import WorkerDashboardSidebar from '../../components/Layout/WorkerDashboardSidebar'
import WorkerAllProduct from '../../components/Worker/WorkerAllProduct'

const WorkerPurchaseHistory = () => {
  return (
    <div>
        <div className="flex justify-between w-full">
            {/* <div className="w-[80px] 800px:w-[330px]"> */}
              <WorkerDashboardSidebar active={3} />
            {/* </div> */}
            <div className="w-full justify-center flex">
              <WorkerAllProduct />
            </div>
          </div>
    </div>
  )
}

export default WorkerPurchaseHistory
