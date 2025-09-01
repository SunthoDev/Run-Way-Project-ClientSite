import { useState } from 'react';
import "./CreateRider.css"
import { useQuery } from '@tanstack/react-query';
import CreateRiderDataSee from './CreateRiderDataSee/CreateRiderDataSee';
import Swal from 'sweetalert2';

// CreateRider_Access

const CreateRider = () => {

    const [tabState, setTabState] = useState(1);
    // =============================================================

    // user data all find use tenStack query 
    let { refetch, data: adminAllUsers = [] } = useQuery(["users"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/users")
        return res.json()

    })

    // Filter all Admins Data of This Website 
    // =============================================
    let AllRider = adminAllUsers?.filter(infoData => infoData?.role === "rider")
    // Filter all Admins Data of This Website 
    // =============================================
    let AllUsers = adminAllUsers?.filter(infoData => infoData?.role === "user")



    // user role Change Click User
    let handleUser = (id) => {
        fetch(`https://server.trustereocourier.com.bd/AdminUpdateRoleUserToCreateRider/${id}`, {
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

        fetch(`https://server.trustereocourier.com.bd/AdminUpdateRoleRider/${id}`, {
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

                fetch(`https://server.trustereocourier.com.bd/AdminDeleteUsers/${id}`, {
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

                {/* Tabs of Users Panel bellow !!*/}
                {/* ==================================== */}
                <div className="flex border-b border-gray-200 space-x-4 mb-4">
                    <button onClick={() => setTabState(1)}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                            }`}
                    >
                        Users
                    </button>
                    <button onClick={() => setTabState(2)}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                            }`}
                    >
                        Rider
                    </button>
                </div>

                {/* User information bellow !! */}
                {/* ==================================== */}
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-black">
                                <th className="text-[14px] font-[600] text-white">Image</th>
                                <th className="text-[14px] font-[600] text-white">Name</th>
                                {/* <th className="text-[14px] font-[600] text-white">Email</th> */}
                                <th className="text-[14px] font-[600] text-white">Role</th>
                                <th className="text-[14px] font-[600] text-white">Change Role</th>
                                <th className="text-[14px] font-[600] text-white">Delete Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabState === 1 &&
                                AllUsers?.slice().reverse().map(allUser => <CreateRiderDataSee refetch={refetch}  handleUser={handleUser} HandleRider={HandleRider} HandleDelete={HandleDelete} key={allUser._id} allUser={allUser}></CreateRiderDataSee>)
                            }
                            {tabState === 2 &&
                                AllRider?.slice().reverse().map(allUser => <CreateRiderDataSee refetch={refetch}  handleUser={handleUser} HandleRider={HandleRider} HandleDelete={HandleDelete} key={allUser._id} allUser={allUser}></CreateRiderDataSee>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateRider;