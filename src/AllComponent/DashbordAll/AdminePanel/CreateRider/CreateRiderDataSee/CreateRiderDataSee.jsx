import { useState } from 'react';
import "./CreateRiderDataSee.css"

const CreateRiderDataSee = ({ allUser, handleUser, HandleRider, HandleDelete, refetch }) => {

    // console.log(allUser)
    let { photo, name, LastName, role, email, _id } = allUser



    // User data received here fo modal show
    // =============================================
    const [activeUser, setActiveUser] = useState(null);

    // Open the modal a set data on useState
    // =============================================
    const handleAccessClick = (user) => {
        setActiveUser(user);
        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("SubAdminAccessSendToAdmin").showModal();
        }, 50);
    };


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
                "text-[#22AFA3]" : role == "subAdmin" ? "text-yellow-600" : "text-black"}`}>{role}</td>
            <td>
                <button onClick={() => handleUser(_id)}>User</button>
                <br />
                <button className="" onClick={() => HandleRider(_id)}>Rides</button>
            </td>
            <td>
                {
                    role == "rider" &&
                    <button>Access Hub</button>
                }
                <br />
                <button onClick={() => HandleDelete(_id)}>Delete</button>
            </td>


        </tr >
    );
};

export default CreateRiderDataSee;