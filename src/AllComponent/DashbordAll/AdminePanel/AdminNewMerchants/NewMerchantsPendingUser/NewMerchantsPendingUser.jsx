import React from 'react';
import "./NewMerchantsPendingUser.css"
import Swal from 'sweetalert2';

const NewMerchantsPendingUser = ({ pendingAllData, refetch }) => {

    // console.log(pendingAllData)

    let { _id, Address, BusinessName, LastName, Phone, email, name, photo, role, status, userId } = pendingAllData

    let handleAdminUserApproved = (id) => {
        // console.log(id)

        fetch(`http://localhost:5000/AdminApprovedNewUser/${_id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Parcel Approved Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })



    }

    return (
        <div className='NewMerchantsPendingUser'>

            <div className='MerchantsPendingUser'>

                <div className="PendingUser grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{userId}</h3>
                        <h3>{email}</h3>
                        <button onClick={() => handleAdminUserApproved(_id)} className='Approved'>Approved</button>
                    </div>

                    <div className="Tow">
                        <h3>{name} {LastName}</h3>
                        <h3>{Address}</h3>
                        <h3>11/10/23.., 12:30 AM</h3>
                    </div>

                    <div className="Three">
                        <h3>{Phone}</h3>
                        <h3>{BusinessName}</h3>
                        <button className='Pending'>{status}</button>

                    </div>


                </div>


            </div>
        </div>
    );
};

export default NewMerchantsPendingUser;