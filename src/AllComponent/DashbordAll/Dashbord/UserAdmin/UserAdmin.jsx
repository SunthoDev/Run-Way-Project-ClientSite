import React from 'react';
import "./UserAdmin.css"
import { useQuery } from '@tanstack/react-query';
import UserAllData from './UserAllData/UserAllData';
import Swal from 'sweetalert2';

const UserAdmin = () => {

    // user data all find use tenStack query 
    let { refetch, data: adminAllUsers = [] } = useQuery(["users"], async () => {
        let res = await fetch("http://localhost:5000/users")
        return res.json()

    })

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
            method: "PATCH",
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
            method: "PATCH",
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
        <div className='UserDataAdmin bg-white '>

            <div className='userData bg-[#F6F6F6] rounded-[7px] mx-0 md:mx-6 my-8 px-4 py-8'>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-[14px] font-[600] text-white">Image</th>
                                <th className="text-[14px] font-[600] text-white">Name</th>
                                <th className="text-[14px] font-[600] text-white">Email</th>
                                <th className="text-[14px] font-[600] text-white">Role</th>
                                <th className="text-[14px] font-[600] text-white">Change Role</th>
                                <th className="text-[14px] font-[600] text-white">Delete Id</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                adminAllUsers.map(allUser => <UserAllData HandleAdmin={HandleAdmin} handleUser={handleUser} HandleRider={HandleRider} HandleSubAdmin={HandleSubAdmin} HandleDelete={HandleDelete} key={allUser._id} allUser={allUser}></UserAllData>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserAdmin;