
import './AllMarchentConsignment.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import UserApprovedConsignment from './UserApprovedConsignment/UserApprovedConsignment';
import UserApprovedPendingConsignment from './UserApprovedPendingConsignment/UserApprovedPendingConsignment';
import UserDelivereConsignment from './UserDelivereConsignment/UserDelivereConsignment';
import UserPartiallyDeliveredConsignment from './UserPartiallyDeliveredConsignment/UserPartiallyDeliveredConsignment';
import UserReturnedConsignment from './UserReturnedConsignment/UserReturnedConsignment';
import UserPendingConsignment from './UserPendingConsignment/UserPendingConsignment';
import UserAllStatusConsignmentData from './UserAllStatusConsignmentData/UserAllStatusConsignmentData';
import useRole from '../../../../Hook/useRole';


const AllMarchentConsignment = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo, status } = roles


    // TODO: Data lode problems late 

    let { refetch, data: AllConsignmentData = [] } = useQuery(["UseAllConsignmentStandardData"], async () => {
        let res = await fetch(`http://localhost:5000/UseAllConsignmentStandardData?email=${user?.email}`)
        return res.json()
    })

    // console.log(AllConsignmentData)


    // All  data find 
    let ConsignmentAllData = AllConsignmentData.filter(approved => approved?.status == "Pending" || approved?.Payment == "Yes" && approved?.status == "Delivered" || approved?.Payment == "Yes" && approved?.status == "PartiallyDelivered" || approved?.Payment == "Yes" && approved?.status == "Cancel")

    // console.log(ConsignmentAllData)



    // pending data find 
    let ReviewData = AllConsignmentData.filter(Review => Review?.status === "Review")
    // console.log(PendingData)

    // approved data find 
    let PendingData = AllConsignmentData.filter(Pending => Pending?.status == "Pending")
    // console.log(ApprovedData)

    // Approved PendingData data find 
    let ApprovedPendingData = AllConsignmentData.filter(approved => approved?.Payment == "No" && approved?.status == "Delivered" || approved?.Payment == "No" && approved?.status == "PartiallyDelivered" || approved?.Payment == "No" && approved?.status == "Cancel")
    // console.log(ApprovedPendingData)

    // Delivered data find 
    let DeliveredData = AllConsignmentData.filter(approved => approved?.status == "Delivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let PartiallyDelivered = AllConsignmentData.filter(approved => approved?.status == "PartiallyDelivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let CancelData = AllConsignmentData.filter(Cancel => Cancel?.status == "Cancel" && Cancel?.Payment == "Yes")
    // console.log(ApprovedPendingData)






    return (
        <div >
            {status == "pending" ?

                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>

                :

                <div className="AllMarchentConsignment  p-6 my-8 mx-8 bg-white rounded-[8px]">

                    <Tabs>
                        <TabList>
                            <Tab> <span className="text-black font-[600] text-[16px]">All</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Pending</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Approved Pending</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Delivered</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Partially Delivered</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Cancel</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Reviewed</span> </Tab>
                        </TabList>

                        <TabPanel>
                            <div className="AllDataConsignment">
                                {
                                    ConsignmentAllData.map(ConsignmentAll => <UserAllStatusConsignmentData key={ConsignmentAll._id} ConsignmentAll={ConsignmentAll}></UserAllStatusConsignmentData>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="PendingConsignment">
                                {
                                    PendingData.map(ConsignmentPending => <UserApprovedConsignment key={ConsignmentPending._id} ConsignmentPending={ConsignmentPending}></UserApprovedConsignment>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="ApprovedPendingData">
                                {
                                    ApprovedPendingData.map(ApprovedPending => <UserApprovedPendingConsignment key={ApprovedPending._id} ApprovedPending={ApprovedPending}></UserApprovedPendingConsignment>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="UserDeliveredData">
                                {
                                    DeliveredData.map(DeliveredData => <UserDelivereConsignment key={DeliveredData._id} DeliveredData={DeliveredData}></UserDelivereConsignment>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="UserPartiallyDelivered">
                                {
                                    PartiallyDelivered.map(PartiallyDeliveredData => <UserPartiallyDeliveredConsignment key={PartiallyDeliveredData._id} PartiallyDeliveredData={PartiallyDeliveredData}></UserPartiallyDeliveredConsignment>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="UserCancelDelivered">
                                {
                                    CancelData.map(CancelDelivered => <UserReturnedConsignment key={CancelDelivered._id} CancelDelivered={CancelDelivered}></UserReturnedConsignment>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="UserReviewUserData">
                                {
                                    ReviewData.map(ReviewUserData => <UserPendingConsignment key={ReviewUserData._id} ReviewUserData={ReviewUserData}></UserPendingConsignment>)
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            }

        </div>
    );
};

export default AllMarchentConsignment;