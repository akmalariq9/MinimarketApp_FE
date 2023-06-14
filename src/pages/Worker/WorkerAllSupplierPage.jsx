import React from 'react'
import WorkerDashboardSidebar from '../../components/Layout/WorkerDashboardSidebar'
import WorkerAllSupplier from '../../components/Worker/WorkerAllSupplier'

const WorkerAllSupplierPage = () => {
  return (
    <div>
    <div className="flex justify-between w-full">
        {/* <div className="w-[80px] 800px:w-[330px]"> */}
          <WorkerDashboardSidebar active={5} />
        {/* </div> */}
        <div className="w-full justify-center flex">
          <WorkerAllSupplier />
        </div>
      </div>
</div>
  )
}

export default WorkerAllSupplierPage
