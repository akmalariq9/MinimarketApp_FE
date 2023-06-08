import React from 'react'
import ManagerDashboardHeader from '../../components/Layout/ManagerDashboardHeader'
import ManagerDashboardSidebar from '../../components/Layout/ManagerDashboardSidebar'
import ManagerAllMember from '../../components/Manager/ManagerAllMember'

const ManagerAllMemberPage = () => {
    return (
        <div>
            <ManagerDashboardHeader active={5} />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <ManagerDashboardSidebar active={5} />
                </div>
                <div className="w-full justify-center flex">
                  <ManagerAllMember />
                </div>
              </div>
        </div>
      )
}

export default ManagerAllMemberPage
