import React from 'react';
import "./NewMerchantsApprovedUser.css"

const NewMerchantsApprovedUser = ({approvedAllData,refetch}) => {
    
    // console.log(approvedAllData)
    let { _id, Address, BusinessName, LastName, Phone, email, name, photo, role, status, userId } = approvedAllData

    return (
        <div className='NewMerchantsApprovedUser'>

            <div className='MerchantsApprovedUser'>

                <div className="ApprovedUser grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{userId}</h3>
                        <h3>{email}</h3>
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

export default NewMerchantsApprovedUser;