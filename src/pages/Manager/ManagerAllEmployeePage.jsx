import React from 'react'
import ManagerDashboardHeader from '../../components/Layout/ManagerDashboardHeader'
import ManagerDashboardSidebar from '../../components/Layout/ManagerDashboardSidebar'
import ManagerAllEmployee from '../../components/Manager/ManagerAllEmployee'

const ManagerAllEmployeePage = () => {
  return (
    <div>
        {/* <ManagerDashboardHeader active={4} /> */}
        <div className="flex justify-between w-full">
            {/* <div className="w-[80px] 800px:w-[330px]"> */}
              <ManagerDashboardSidebar active={4} />
            {/* </div> */}
            <div className="w-full justify-center flex">
              <ManagerAllEmployee />
            </div>
          </div>
    </div>
  )
}

export default ManagerAllEmployeePage
