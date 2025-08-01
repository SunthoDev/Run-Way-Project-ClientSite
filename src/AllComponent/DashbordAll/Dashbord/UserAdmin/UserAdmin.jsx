import { useState } from 'react';
import "./UserAdmin.css"
import { useQuery } from '@tanstack/react-query';
import UserAllData from './UserAllData/UserAllData';
import Swal from 'sweetalert2';

const UserAdmin = () => {

    const [tabState, setTabState] = useState(1);
    // =============================================================

    // user data all find use tenStack query 
    let { refetch, data: adminAllUsers = [] } = useQuery(["users"], async () => {
        let res = await fetch("http://localhost:5000/users")
        return res.json()

    })

    // Filter all Admins Data of This Website 
    // =============================================
    let AllAdmins = adminAllUsers?.filter(infoData => infoData?.role === "admin")
    // Filter all Admins Data of This Website 
    // =============================================
    let AllSubAdmins = adminAllUsers?.filter(infoData => infoData?.role === "subAdmin")
    // Filter all Admins Data of This Website 
    // =============================================
    let AllRider = adminAllUsers?.filter(infoData => infoData?.role === "rider")
    // Filter all Admins Data of This Website 
    // =============================================
    let AllUsers = adminAllUsers?.filter(infoData => infoData?.role === "user")



    // user role Change Click Admin
    let HandleAdmin = (id) => {

        fetch(`http://localhost:5000/AdminUpdateRoleAdmin/${id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Update Admin has been Success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                refetch()
            })
    }
    // user role Change Click User
    let handleUser = (id) => {

        fetch(`http://localhost:5000/AdminUpdateRoleUser/${id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Update User has been Success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }
    // user role Change Click Rider
    let HandleRider = (id) => {

        fetch(`http://localhost:5000/AdminUpdateRoleRider/${id}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Update Rider has been Success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }
    // user role Change Click SubAdmin
    let HandleSubAdmin = (id) => {

        fetch(`http://localhost:5000/AdminUpdateRoleSubAdmin/${id}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Update SubAdmin has been Success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }
    // user role Change Click Delete
    let HandleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/AdminDeleteUsers/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Admin Delete User has been Success",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        console.log(data)
                        refetch()
                    })
            }
        });
    }

    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* Tabs of Users Panel */}
                {/* ==================================== */}
                <div className="flex border-b border-gray-200 space-x-4 mb-4">
                    <button onClick={() => setTabState(1)}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                            }`}
                    >
                        Admin
                    </button>
                    <button onClick={() => setTabState(2)}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                            }`}
                    >
                        Sub Admin
                    </button>
                    <button onClick={() => setTabState(3)}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                            }`}
                    >
                        Rider
                    </button>
                    <button onClick={() => setTabState(4)}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 4 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                            }`}
                    >
                        Users
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-black">
                                <th className="text-[14px] font-[600] text-white">Image</th>
                                <th className="text-[14px] font-[600] text-white">Name</th>
                                <th className="text-[14px] font-[600] text-white">Email</th>
                                <th className="text-[14px] font-[600] text-white">Role</th>
                                <th className="text-[14px] font-[600] text-white">Change Role</th>
                                <th className="text-[14px] font-[600] text-white">Delete Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabState === 1 &&
                                AllAdmins?.slice().reverse().map(allUser => <UserAllData refetch={refetch} HandleAdmin={HandleAdmin} handleUser={handleUser} HandleRider={HandleRider} HandleSubAdmin={HandleSubAdmin} HandleDelete={HandleDelete} key={allUser._id} allUser={allUser}></UserAllData>)
                            }
                            {tabState === 2 &&
                                AllSubAdmins?.slice().reverse().map(allUser => <UserAllData refetch={refetch} HandleAdmin={HandleAdmin} handleUser={handleUser} HandleRider={HandleRider} HandleSubAdmin={HandleSubAdmin} HandleDelete={HandleDelete} key={allUser._id} allUser={allUser}></UserAllData>)
                            }
                            {tabState === 3 &&
                                AllRider?.slice().reverse().map(allUser => <UserAllData refetch={refetch} HandleAdmin={HandleAdmin} handleUser={handleUser} HandleRider={HandleRider} HandleSubAdmin={HandleSubAdmin} HandleDelete={HandleDelete} key={allUser._id} allUser={allUser}></UserAllData>)
                            }
                            {tabState === 4 &&
                                AllUsers?.slice().reverse().map(allUser => <UserAllData refetch={refetch} HandleAdmin={HandleAdmin} handleUser={handleUser} HandleRider={HandleRider} HandleSubAdmin={HandleSubAdmin} HandleDelete={HandleDelete} key={allUser._id} allUser={allUser}></UserAllData>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserAdmin;