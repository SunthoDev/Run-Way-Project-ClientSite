import React, { useState } from 'react';
import "./AdminEditUserInformation.css"
import { Link, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from 'moment';

const AdminEditUserInformation = () => {

    let userInformation = useLoaderData()
    // console.log(userInformation)
    let { name, LastName, BusinessName, Address, Phone, email, userId, status, PoliceStations } = userInformation

    // ==============================================================================
    // Find all police district station 
    // ==============================================================================
    let [Districts, setDistrict] = useState("")
    let handleDistrictData = (e) => {
        setDistrict(e.target.value)
    }
    // Coverage All Police Station Data Find
    // ==================================================
    let { data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("http://localhost:5000/CoveragesPoliceStationAll")
        return res.json()
    })
    let DistrictAllPoliceStation = AllCoveragesPoliceStation.filter(PoliceStationAll => PoliceStationAll?.AddDistrict === Districts)




    return (
        <div className='bg-[#F6F6F6]'>
            <div className='StandardDeliveryParent px-[12px] md:px-4 my-4'>
                <div className="StandardMain bg-white rounded-[8px] p-[28px]">
                    <h2 className='text-black font-[600] text-[20px]'>Update Merchant Parcel Information</h2>
                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                    {/* =================================================== */}
                    {/* Update User Informaiton !! */}
                    {/* =================================================== */}
                    <form
                        className='StandardFromData'
                        onSubmit={(event) => {
                            event.preventDefault()
                            let nameUP = event.target.nameUP.value
                            let LastNameUP = event.target.LastNameUP.value
                            let BusinessNameUP = event.target.BusinessNameUP.value
                            let AddressUP = event.target.AddressUP.value
                            let PhoneUP = event.target.PhoneUP.value
                            let statusUP = event.target.statusUP.value
                            let DistrictUP = event.target.DistrictUP.value
                            let PoliceStationsUP = event.target.PoliceStationsUP.value

                            let allInfo = { nameUP, LastNameUP, BusinessNameUP, AddressUP, PhoneUP, statusUP, DistrictUP, PoliceStationsUP: PoliceStationsUP === "" ? PoliceStations : PoliceStationsUP}
                            // console.log(allInfo)

                            fetch(`http://localhost:5000/AdminUserInformationUpdate/${userInformation?._id}`, {
                                method: "PATCH",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(allInfo)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.modifiedCount > 0) {
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "User information update has been Success",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        refetch()
                                    }
                                })
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                            {/* ======================================== */}
                            {/* Left Information!! */}
                            {/* ======================================== */}
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Name</h4>
                                <div className="col-span-4">
                                    <h4 className=' text-[16px] font-[500] '>Name: {name}</h4>
                                    <input defaultValue={name} className=' w-[100%]' type="text" name='nameUP' />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>LastName</h4>
                                <div className="col-span-4">
                                    <h4 className=' text-[16px] font-[500] '>LastName: {LastName}</h4>
                                    <input defaultValue={LastName} className=' w-[100%]' type="text" name='LastNameUP' />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>BusinessName</h4>
                                <div className="col-span-4">
                                    <h4 className=' text-[16px] font-[500] '>BusinessName: {BusinessName}</h4>
                                    <input defaultValue={BusinessName} className=' w-[100%]' type="text" name='BusinessNameUP' />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Address</h4>
                                <div className="col-span-4">
                                    <h4 className='text-[16px] font-[500] '>Address: {Address}</h4>
                                    <input defaultValue={Address} className='w-[100%]' type="text" name='AddressUP' />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Phone</h4>
                                <div className="col-span-4">
                                    <h4 className='text-[16px] font-[500] '>Phone: {Phone}</h4>
                                    <input defaultValue={Phone} className='w-[100%]' type="number" name='PhoneUP' />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>status</h4>
                                <div className="col-span-4">
                                    <h4 className='text-[16px] font-[500] '>status: {status}</h4>
                                    <select name='statusUP' className=" bg-white  select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                        <option selected>{status}</option>
                                        <option>approved</option>
                                        <option>pending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>District</h4>
                                <div className="col-span-4">
                                    <h4 className='text-[16px] font-[500] '>District: {userInformation?.Districts}</h4>
                                    <select name='DistrictUP' onBlur={handleDistrictData} className=" bg-white select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                        <option selected>{userInformation?.Districts}</option>
                                        <option>Bogra</option>
                                        <option>Habiganj</option>
                                        <option>Sylhet</option>
                                        <option>Chattogram</option>
                                        <option>Kishoreganj</option>
                                        <option>Lakshmipur</option>
                                        <option>Pabna</option>
                                        <option>Pirojpur</option>
                                        <option>Shariatpur</option>
                                        <option>Thakurgaon</option>
                                        <option>Joypurhat</option>
                                        <option>Munshiganj</option>
                                        <option>Rangamati</option>
                                        <option>Bandarban</option>
                                        <option>Dinajpur</option>
                                        <option>Mymensingh</option>
                                        <option>Nilphamari</option>
                                        <option>Noakhali</option>
                                        <option>Rajbari</option>
                                        <option>Chuadanga</option>
                                        <option>Jhalokati</option>
                                        <option>Narsingdi</option>
                                        <option>Jashore</option>
                                        <option>Manikganj</option>
                                        <option>Sherpur</option>
                                        <option>Sirajganj</option>
                                        <option>Gopalganj</option>
                                        <option>Jamalpur</option>
                                        <option>Khagrachhari</option>
                                        <option>Naogaon</option>
                                        <option>Narayanganj</option>
                                        <option>Panchagarh</option>
                                        <option>Chandpur</option>
                                        <option>Cox's Bazar</option>
                                        <option>Gaibandha</option>
                                        <option>Rajshahi</option>
                                        <option>Bagerhat</option>
                                        <option>Feni</option>
                                        <option>Magura</option>
                                        <option>Sunamganj</option>
                                        <option>Barishal</option>
                                        <option>Cumilla</option>
                                        <option>Madaripur</option>
                                        <option>Chapainawabganj</option>
                                        <option>Khulna</option>
                                        <option>Moulvibazar</option>
                                        <option>Natore</option>
                                        <option>Rangpur</option>
                                        <option>Satkhira</option>
                                        <option>Dhaka</option>
                                        <option>Tangail</option>
                                        <option>Lalmonirhat</option>
                                        <option>Meherpur</option>
                                        <option>Gazipur</option>
                                        <option>Kurigram</option>
                                        <option>Netrokona</option>
                                        <option>Barguna</option>
                                        <option>Kushtia</option>
                                        <option>Patuakhali</option>
                                        <option>Bhola</option>
                                        <option>Brahmanbaria</option>
                                        <option>Faridpur</option>
                                        <option>Jhenaidah</option>
                                        <option>Narail</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Thana</h4>
                                <div className="col-span-4">
                                    <h4 className='text-[16px] font-[500] '>PoliceStations: {PoliceStations}</h4>
                                    <select name='PoliceStationsUP' className=" bg-white  select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                        {
                                            DistrictAllPoliceStation?.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option> )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="mt-[18px]">
                                <button className='bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminEditUserInformation;