import React, { useEffect } from 'react';
import "./ManageUser.css"
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageUser = () => {
    let disable = true

    // TODO===================================

    // user data all find use tenStack query 
    let { refetch, data: users = [] } = useQuery(["users"], async () => {
        let res = await fetch("http://localhost:5000/users")
        return res.json()

    })

    // user delete admin
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            fetch(`http://localhost:5000/usersDelete/${user._id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount) {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    }
                    refetch()
                })
        })

    }



    return (
        <div classNam="">
            <div className="titleUser px-4 md:px-0 w-full md:w-2/4 mx-auto mb-6 mt-8">
                <p>------MANAGE USER------</p>
                <h3>Bay One User All & Delete</h3>
            </div>

            <div className="myItemsAll bg-white  flex justify-between  my-10 mx-4 md:mx-6 rounded-sm">


                <div className="div mx-7 my-8 w-full text-left">

                    <div className="hedInfo">
                        <h2>Total Users: {users.length}</h2>
                    </div>

                    <div className="MyData pt-10 ">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                {/* head */}
                                <thead>
                                    <tr className="Header">
                                        <th className='text-white'>NUM</th>
                                        <th className='text-white'>IMAGE</th>
                                        <th className='text-white'>NAME</th>
                                        <th className='text-white'>EMAIL</th>
                                        <th className='text-white'>ROLE</th>
                                        <th className='text-white'>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        users.map((us, index) => <tr key={us._id}>
                                            <td className='text-black font-bold text-left'>{index + 1}</td>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={us.photo} alt="img" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-black font-bold text-left'>{us?.name}</td>
                                            <td className='text-black font-bold text-left'>{us?.email}</td>


                                            <td className={` ${us?.role === "admin" ? "text-green-700 font-bold text-left" : us?.role === "instructor" ? "text-yellow-500 text-left font-bold" : "text-red-700 font-bold text-left"}`}>
                                                {us?.role ? us?.role : "User"}
                                            </td>


                                            <td>
                                                <button onClick={() => handleDeleteUser(us)} className="deleteButton"><FaRegTrashAlt></FaRegTrashAlt></button>
                                            </td>

                                        </tr>)
                                    }
                                </tbody>

                            </table>
                        </div>

                    </div>


                </div>
            </div>


        </div>
    );
};

export default ManageUser;