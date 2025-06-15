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
    let handelLogOut = () => {
        logOutUser()
            .then(data => { })
            .then(error => { })
    }

    const [roles] = useRole()
    const ad = roles?.role === "admin"

    // console.log(roles)

    let { role, Address, BusinessName, name, userId, photo } = roles



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
                        // Admin Panel (Admin Panel) all Route 
                        // ======================================================================
                        ad ? <div className='RouteAllParent'>
                            <li className='Dashboard'> <Link to="/dashboard/AdminDashboard">Dashboard</Link></li>
                            <li> <NavLink to="/dashboard/AdminDashboard/AdminCreateHub"><span><FaHome></FaHome></span>Create Hub</NavLink></li>
                            <li> <NavLink to="/dashboard/AdminDashboard/AdminMyHubRequestAll"><span><FaHome></FaHome></span> My Hub</NavLink></li>
                            <li> <NavLink to="/dashboard/AdminDashboard/Dispatch"><span><FaHome></FaHome></span>Dispatch</NavLink></li>
                            <li> <NavLink to="/dashboard/AdminDashboard/BalanceRequestAllUser"><span><FaHome></FaHome></span>Balance Request Users</NavLink></li>
                            <li> <NavLink to="/dashboard/AdminDashboard/ApprovedParcelRoute"><span><FaWallet></FaWallet></span> Approve Parcel</NavLink></li>
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
                            <li> <NavLink to="/dashboard/AdminDashboard/AdminViewPaymentRequestAll"><span><FaWallet></FaWallet></span> View Payments</NavLink></li>
                            <li> <NavLink to="/dashboard/AdminDashboard/AdminAmountUpdateParcel"><span><FaWallet></FaWallet></span> Amount Update Percel</NavLink></li>
                            <li> <NavLink to="/dashboard/AdminDashboard/NewMerchants"><span><FaWallet></FaWallet></span> New Merchants</NavLink></li>
                            <li> <NavLink to="/dashboard/User"><span><FaWallet></FaWallet></span> users</NavLink></li>
                        </div>
                            :
                            // User Panel (MERCHENT Panel) all Route 
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