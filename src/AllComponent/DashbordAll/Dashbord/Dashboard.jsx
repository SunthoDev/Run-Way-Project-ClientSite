import React from 'react';
import "./Dashboard.css"
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaWallet, FaShoppingCart, FaCalendarAlt, FaHome, FaHeadSideVirus } from 'react-icons/fa';
// import logo from "../../../assets/logo.png"
import useRole from '../../../Hook/useRole';
import { useContext } from 'react';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import HeaderDashBord from '../HeaderDashBord/HeaderDashBord';

const Dashboard = () => {

    let { user, logOutUser } = useContext(AuthContext)
    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo } = roles
    const ad = roles?.role === "admin"
    const subAdmin = roles?.role === "subAdmin"
    const Rider = roles?.role === "rider"
    // console.log(roles)

    let handelLogOut = () => {
        logOutUser()
            .then(data => { })
            .then(error => { })
    }



    return (
        <div className="drawer md:drawer-open  bg-[#F9FBFD]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
            <div className="drawer-content flex flex-col  ">

                <HeaderDashBord></HeaderDashBord>
                {/* ===================================== */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>



            <div className="drawer-side  z-[998]">
                <label htmlFor="my-drawer-2" className=" drawer-overlay"></label>

                <ul className="menuParent menu px-[12px] pt-[28px] w-90 hh-[100%] text-base-content">
                    {
                        ad ?
                            <div className='NameInformation mb-[14px]'>

                                <div className="img ">
                                    <img className="w-full" src={photo} alt="img" />
                                </div>

                                <h3 className="text-[16px] font-[600] text-black text-center pt-[14px] leading-[26px]">
                                    This is {name}
                                </h3>

                                <div className="horizontalRole h-[1px] mt-[18px] w-[100%] bg-[#EEEEEE]"></div>

                            </div>
                            :
                            <div className='NameInformation mb-[14px]'>

                                <div className="img ">
                                    <img className="w-full" src={photo} alt="img" />
                                </div>

                                <h3 className="text-[16px] font-[600] text-black text-center pt-[14px] leading-[26px]">
                                    This is {name}<br />Company ID: {userId}
                                </h3>

                                <div className="horizontalRole h-[1px] mt-[18px] w-[100%] bg-[#EEEEEE]"></div>

                            </div>
                    }

                    {/* ==================================================== */}

                    {
                        // Admin Panel & Sub-Admin Panel (Admin Panel) all Route 
                        // ======================================================================
                        ad || subAdmin ? <div className='RouteAllParent'>
                            <li className='Dashboard'> <Link to="/dashboard/AdminDashboard">Dashboard</Link></li>

                            {
                                ad || (subAdmin && roles?.Hub_Information_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/HubInformation"><span><FaHome></FaHome></span>Hub Information</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome />Hub Information</div>
                            }
                            {
                                ad || (subAdmin && roles?.Rider_CODAmount_Request_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/RiderCODAmountRequest"><span><FaHome></FaHome></span>Rider CODAmount Request</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome />Rider CODAmount Request</div>
                            }


                            {
                                ad || (subAdmin && roles?.Create_Hub_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/AdminCreateHub"><span><FaHome></FaHome></span>Create Hub</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome />Create Hub</div>
                            }
                            {
                                ad || (subAdmin && roles?.My_Hub_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/AdminMyHubRequestAll"><span><FaHome></FaHome></span> My Hub</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> My Hub</div>
                            }
                            {
                                ad || (subAdmin && roles?.Dispatch_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/Dispatch"><span><FaHome></FaHome></span>Dispatch</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> Dispatch</div>
                            }
                            {
                                ad || (subAdmin && roles?.Delivery_Monitoring_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/DeliveryMonitoring"><span><FaHome></FaHome></span>Delivery Monitoring</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> Delivery Monitoring</div>
                            }
                            {
                                ad || (subAdmin && roles?.Assign_Parcel_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/AssignParcel"><span><FaHome></FaHome></span>Assign Parcel</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> Assign Parcel</div>
                            }
                            {
                                ad || (subAdmin && roles?.ReturnParcel_Monitoring_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/ReturnParcelMonitoring"><span><FaHome></FaHome></span>Return Parcel Monitoring</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> Return Parcel Monitoring</div>
                            }
                            {
                                ad || (subAdmin && roles?.Balance_Request_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/BalanceRequestAllUser"><span><FaHome></FaHome></span>Balance Request Users</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> Balance Request Users</div>
                            }
                            {
                                ad || (subAdmin && roles?.All_Report_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/AllReportEverything"><span><FaHome></FaHome></span>All Report</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> All Report</div>
                            }
                            {
                                ad || (subAdmin && roles?.Approved_Parcel_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/ApprovedParcelRoute"><span><FaWallet></FaWallet></span> Approve Parcel</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> Approve Parcel</div>
                            }
                            {
                                ad || (subAdmin && roles?.Coverage_Access === "Yes") ?
                                    <li>
                                        <div className="dropdown">
                                            <span><FaWallet></FaWallet></span>
                                            <label tabIndex={0} className="">Coverages</label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu bg-[#22afa3] rounded-[6px] shadow  w-[100%] ">

                                                <li><NavLink to="/dashboard/AdminDashboard/AdminCoveragesDistricts">Districts</NavLink></li>
                                                <li><NavLink to="/dashboard/AdminDashboard/AdminCoveragesPoliceStations">Police Stations</NavLink></li>

                                            </ul>
                                        </div>
                                    </li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> Coverages</div>
                            }
                            {
                                ad || (subAdmin && roles?.View_Payment_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/AdminViewPaymentRequestAll"><span><FaWallet></FaWallet></span> View Payments</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome /> View Payments</div>
                            }
                            {
                                ad || (subAdmin && roles?.AmountUpdate_Parcel_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/AdminAmountUpdateParcel"><span><FaWallet></FaWallet></span> Amount Update Parcel</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome />Amount Update Parcel</div>
                            }
                            {
                                ad || (subAdmin && roles?.New_Merchants_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/NewMerchants"><span><FaWallet></FaWallet></span> New Merchants</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome />New Merchants</div>
                            }
                            {
                                ad || (subAdmin && roles?.User_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/User"><span><FaWallet></FaWallet></span> users</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome />Users</div>
                            }
                            {
                                ad || (subAdmin && roles?.CreateRider_Access === "Yes") ?
                                    <li> <NavLink to="/dashboard/AdminDashboard/CreateRider"><span><FaWallet></FaWallet></span> Create Rider</NavLink></li>
                                    :
                                    <div className="hidden flex items-center gap-2 text-gray-500 cursor-not-allowed opacity-50"><FaHome />Create Rider</div>
                            }
                        </div>
                            : Rider ?
                                // ======================================================================
                                // User Panel (Rider Panel) all Route 
                                // ======================================================================
                                <div className='RouteAllParent'>
                                    <li className='Dashboard'> <NavLink to="/dashboard/RiderDashboard"><span><i className="fa fa-tachometer" aria-hidden="true"></i></span>Dashboard</NavLink></li>
                                    <li> <NavLink to="/dashboard/MyParcelRider"><span><i className="fa fa-tachometer" aria-hidden="true"></i></span>My Parcel</NavLink></li>
                                    <li> <NavLink to="/dashboard/ParcelInfoOfRider"><span><i className="fa fa-tachometer" aria-hidden="true"></i></span>Parcel Info</NavLink></li>
                                    <li> <NavLink to="/dashboard/ParcelDeliveryHistory"><span><i className="fa fa-tachometer" aria-hidden="true"></i></span>Parcel History</NavLink></li>


                                </div>
                                :
                                // ======================================================================
                                // User Panel (MARCHENT Panel) all Route 
                                // ======================================================================
                                <div className='RouteAllParent'>
                                    <li className='Dashboard'> <NavLink to="/dashboard/dashboard"><span><i className="fa fa-tachometer" aria-hidden="true"></i></span>Dashboard</NavLink></li>
                                    <li> <NavLink to="/dashboard/addParcel"><span><i className="fa fa-circle-o-notch" aria-hidden="true"></i></span> Add Parcel</NavLink></li>
                                    <li> <NavLink to="/dashboard/AllMarchentConsignment"><span><i className="fa fa-gg" aria-hidden="true"></i></span> All Consignments</NavLink></li>
                                    <li> <NavLink to="/dashboard/UserAllPickupRequestData"><span><i className="fa fa-tasks" aria-hidden="true"></i></span> My Pickup Parcel</NavLink></li>
                                    <li> <NavLink to="/dashboard/UserAmountChange"><span><i className="fa fa-money" aria-hidden="true"></i></span> Amount Change</NavLink></li>
                                    <li> <NavLink to="/dashboard/UserAllCancelParcel"><span><i className="fa fa-share-square-o" aria-hidden="true"></i></span> Cancelled Parcels</NavLink></li>
                                    <li> <NavLink to="/dashboard/UserAllPaymentRequestData"><span><i className="fa fa-credit-card" aria-hidden="true"></i></span> Payment List</NavLink></li>
                                    <li> <NavLink to="/dashboard/API"><span><i className="fa fa-credit-card" aria-hidden="true"></i></span>API</NavLink></li>
                                    <li> <NavLink to="/dashboard/AddBalancePayRequest"><span><i className="fa fa-credit-card" aria-hidden="true"></i></span>Balance Request</NavLink></li>
                                </div>
                    }

                    {/* others panel */}
                    <div className="divider  text-white"></div>

                    <li><Link to="/"><span><FaHome></FaHome></span>Home</Link></li>

                </ul>

            </div>
        </div >


    );
};

export default Dashboard;