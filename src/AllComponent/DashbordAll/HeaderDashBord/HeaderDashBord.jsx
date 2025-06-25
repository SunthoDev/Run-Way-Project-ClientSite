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


    const chatMessages = [
        { from: "user", message: "Hello admin!", date: "2025-06-04 10:30 AM" },
        { from: "admin", message: "Hello! How can I help you?", date: "2025-06-04 10:32 AM" },
        { from: "user", message: "I need help with a return request.", date: "2025-06-04 10:33 AM" },
        { from: "admin", message: "Sure, give me the parcel ID.", date: "2025-06-04 10:34 AM" },
        { from: "user", message: "Parcel ID is 123456789", date: "2025-06-04 10:35 AM" },
    ];

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
                            <i onClick={() => document.getElementById('MyChat').showModal()} className="fa text-[22px] font-[600] mr-[10px] fa-bell-o" aria-hidden="true"></i>
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

            {/* =========================================================== */}
            {/* User See All Message that was game admin Start*/}
            {/* =========================================================== */}

            {/* Modal */}
            <dialog id="MyChat" className="modal">
                <div className="modal-box w-11/12 max-w-[480px]">
                    <h3 className="font-bold text-lg mb-4 text-center text-white">📢Chat Messages</h3>

                    {/* Chat Body */}
                    <div className="h-96 overflow-y-auto space-y-4 px-2 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1517816428104-797678c7cf0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                        }}
                    >
                        {chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat ${index % 2 === 0 ? 'chat-start' : 'chat-end'}`}
                            >
                                <div className="chat-bubble bg-gray-100 text-gray-900">
                                    {msg.message}
                                    <div className="text-xs text-gray-500 mt-1">{msg.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Close Button */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* =========================================================== */}
            {/* User See All Message that was game admin End*/}
            {/* =========================================================== */}




        </div>
    );
};

export default HeaderDashBord;
