import React, { useContext } from 'react';
import "./HeaderDashBord.css"
import logo from "../../../assets/logo/LogoTwo.png"
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../Hook/useRole';
import { Link } from 'react-router-dom';

const HeaderDashBord = () => {

    let { user, logOutUser } = useContext(AuthContext)
    // console.log(user)
    let handelLogOut = () => {
        logOutUser()
            .then(data => { })
            .then(error => { })
    }

    const [roles] = useRole()
    const ad = roles?.role === "admin"

    // console.log(roles)


    let handleSendRequest = () => {
        alert("Send Your Request")
    }



    return (
        <div className="DashboardNavbar navbar bg-[#F6F6F6] z-50 fixed md:sticky top-0 w-[100%]">
            {/* ================================== */}
            <div className="flex-1">
                {/* Dashboard sidebar open drawer */}
                <label htmlFor="my-drawer-2" className="btn w-[60px] md:hidden"><i class="fa text-black text-2xl fa-bars" aria-hidden="true"></i></label>

                <div className="w-[20%]">
                    <img className='w-[100%]' src={logo} alt="img" />
                </div>

                {
                    ad &&
                    <div className="hidden md:block">
                        <div className="flex gap-4 ml-0 md:ml-[64px] ">
                            <h3 className='text-[16px] font-[600] text-black'>Pick & Drop</h3>
                            <h3 className='text-[16px] font-[600] text-black'>SMS</h3>
                            <h3 className='text-[16px] font-[600] text-black'>Monitoring</h3>
                        </div>
                    </div>
                }

            </div>
            {/* ================================== */}
            <div className="flex-none gap-2">
                <div className="form-control">
                    {
                        ad ?
                            <i onClick={() => document.getElementById('AdminSentNotice').showModal()} className="fa text-[26px] font-[600] mr-[10px] fa-comments-o" aria-hidden="true"></i>
                            :
                            <i className="fa text-[22px] font-[600] mr-[10px] fa-bell-o" aria-hidden="true"></i>
                    }
                </div>

                <div className="dropdown dropdown-end">

                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar mx-[32px]">
                        <div className="ProfileIcon">
                            <img className='w-[100%]' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </label>

                    {
                        ad ?

                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><Link to="/dashboard/User">User</Link></li>
                                <li onClick={handleSendRequest}><a>Delete Account</a></li>
                                <hr />
                                <li><button onClick={handelLogOut}>Logout</button></li>
                            </ul>
                            :
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><Link to={`/dashboard/UserAddBankDetails/${roles.userId}`}>Add Bank Details</Link></li>
                                <hr />
                                <li><button onClick={handelLogOut}>Logout</button></li>
                            </ul>
                    }

                </div>
            </div>


            {/* =========================================================== */}
            {/* Admin Send Notice All Us4er And Particle User Start*/}
            {/* =========================================================== */}
            {/* Modal */}
            <dialog id="AdminSentNotice" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg mb-4 text-center text-white">Send Message Panel</h3>

                    {/* ALL MERCHANT SECTION */}
                    <div className="mb-6 border-b pb-6">
                        <h4 className="font-semibold text-white mb-2">📢 Send Message to All Merchants</h4>
                        <textarea
                            className="textarea textarea-bordered w-full min-h-[100px]"
                            placeholder="Write message for all merchants..."
                        ></textarea>
                        <button className="btn btn-success mt-3">Send Message</button>
                    </div>

                    {/* PARTICULAR USER SECTION */}
                    <div>
                        <h4 className="font-semibold text-white mb-2">🎯 Send Message to Particular User</h4>
                        <input
                            type="text"
                            placeholder="Enter User ID"
                            className="input input-bordered w-full mb-2"
                        />
                        <textarea
                            className="textarea textarea-bordered w-full min-h-[100px]"
                            placeholder="Write message for this user..."
                        ></textarea>
                        <button className="btn btn-info mt-3">Send Message</button>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* =========================================================== */}
            {/* Admin Send Notice All Us4er And Particle User End*/}
            {/* =========================================================== */}







        </div>
    );
};

export default HeaderDashBord;
