import React, { useState } from 'react';
import "./UserAllData.css"

const UserAllData = ({ allUser,HandleAdmin,handleUser,HandleRider,HandleSubAdmin,HandleDelete}) => {
    // console.log(allUser)

    let { photo, name, LastName, role, email,_id } = allUser

    return (
        <tr className='UserAllData'>

            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={photo} />
                        </div>
                    </div>
                </div>
            </td>

            <td>
                <h3>{name}</h3>
            </td>
            <td>
                <h3>{email}</h3>
            </td>
            <td className={`Role ${role == "admin" ? "text-red-700" : role == "rider" ?
              "text-[#22AFA3]" :  role == "subAdmin" ? "text-yellow-600" : "text-black"}`}>{role}</td>
            <td>
                <button onClick={()=>HandleAdmin(_id)}>Admin</button>
                <br />
                <button onClick={()=>handleUser(_id)}>User</button>
                <br />
                <button onClick={()=>HandleRider(_id)}>Rides</button>
                <br />
                <button onClick={()=>HandleSubAdmin(_id)}>Sub Admin</button>
            </td>
            <td><button onClick={()=>HandleDelete(_id)}>Delete</button></td>

        </tr>
    );
};

export default UserAllData;