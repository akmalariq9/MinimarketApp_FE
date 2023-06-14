import React from 'react'
import WorkerDashboardSidebar from '../../components/Layout/WorkerDashboardSidebar'
import WorkerAllMember from '../../components/Worker/WorkerAllMember'

const WorkerAllMemberPage = () => {
    return (
        <div>
            <div className="flex justify-between w-full">
                {/* <div className="w-[80px] 800px:w-[330px]"> */}
                  <WorkerDashboardSidebar active={4} />
                {/* </div> */}
                <div className="w-full justify-center flex">
                  <WorkerAllMember />
                </div>
              </div>
        </div>
      )
}

export default WorkerAllMemberPage
