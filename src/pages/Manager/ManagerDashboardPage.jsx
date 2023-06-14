import React from 'react'
//import DashboardHeader from '../../components/Layout/DashboardHeader'
import ManagerDashboardSidebar from '../../components/Layout/ManagerDashboardSidebar'
import ManagerDashboardHeader from '../../components/Layout/ManagerDashboardHeader'
import Dashboard from '../../components/Manager/Dashboard.jsx'

const DashboardPage = () => {
  return (
      <div>
          {/* <ManagerDashboardHeader active={5} /> */}
          <div className="flex justify-between w-full">
              <div className="w-[80px] 800px:w-[330px]">
                <ManagerDashboardSidebar />
              </div>
              <div className="w-full justify-center flex">
                <Dashboard />
              </div>
            </div>
      </div>
    )
}

export default DashboardPage
