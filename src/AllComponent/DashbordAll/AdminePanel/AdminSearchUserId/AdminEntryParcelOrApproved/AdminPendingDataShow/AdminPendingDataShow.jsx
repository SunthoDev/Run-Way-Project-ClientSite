import React, { useState } from 'react';
import "./AdminPendingDataShow.css"
import useRole from '../../../../../../Hook/useRole';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const AdminPendingDataShow = ({ ReviewDataSee, refetch }) => {
    // console.log(PendingDataSee)

    let [district, setDistrict] = useState("")

    let handleDistrictData = (e) => {
        setDistrict(e.target.value)
    }

    // Coverage All Police Station Data Find
    let { data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll")
        return res.json()

    })

    let DistrictAllPoliceStation = AllCoveragesPoliceStation.filter(PoliceStationAll => PoliceStationAll?.AddDistrict == district)


    // =========================================================

    const [roles] = useRole()

    let { CodAmount, Invoice, StandardEmailUser, StandardParcelId, address, date, District, name, note, number, policeStation, status, weight, _id } = ReviewDataSee

    // ====================================
    // Admin Update Parcel Data
    // ====================================
    let handleAdminUpdateUserStandardParcelDataEntry = (event) => {
        event.preventDefault()
        let PoliceStation = event.target.PoliceStation.value
        let Weight = event.target.Weight.value
        let UpdateUserOrder = { district, PoliceStation, Weight }
        // console.log(UpdateUserOrder)

        fetch(`https://server.trustereocourier.com.bd/AdminUpdateUserStandardData/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(UpdateUserOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Parcel Update Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })
    }

    // ====================================
    // Admin Pending Parcel Data
    // =====================================
    let handlePendingData = (id) => {
        let ApprovedData = { ApprovedOffice: "Corporate office", ApprovedName: roles?.name, PendingDate: moment().format("MM/DD/YY , hh:mm A"), AssignRider: "No" }

        fetch(`https://server.trustereocourier.com.bd/AdminApprovedUserStandardData/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(ApprovedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Parcel Pending Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }



    return (
        <div className='AdminPendingDataShow'>
            <div className="PendingData grid grid-cols-1 md:grid-cols-7 gap-5 items-center">

                <div className="Left cols-span-1 md:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                        <div className="one">
                            <h3 className='text-black'> Sender: {name}</h3>
                            <h3 className='text-black'>ID: #{StandardParcelId}</h3>
                            <h3 className='text-black'> Email: {StandardEmailUser}</h3>
                            <h3 className='text-black'> Cod-Amount: ৳{CodAmount}</h3>
                            <h3 className='text-black'> {date}</h3>

                            <div className="flex gap-5 pt-[8px]">
                                <button className="bg-red-600 text-white font-[600] py-1 px-2 rounded-[4px]">Remove</button>
                                <button onClick={() => handlePendingData(_id)} className="bg-green-600 text-white py-1 px-2 rounded-[4px]">Pending</button>

                            </div>
                        </div>
                        <div className="Tow">
                            <h3>{roles.name} {roles.LastName}</h3>
                            <h3>{roles.Address}</h3>
                            <h3>{roles.Phone}</h3>
                        </div>

                    </div>

                </div>


                <div className="Right cols-span-1 md:col-span-3">
                    <div className="flex justify-evenly">
                        <button class="text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]">Home Delivery</button>
                        <button class="text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]">Point Delivery</button>
                    </div>
                    <form onSubmit={handleAdminUpdateUserStandardParcelDataEntry}>

                        <select onBlur={handleDistrictData} required className="col-span-4 select select-bordered max-w-xs  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                            <option disabled selected>{District}</option>
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

                        <select name='PoliceStation' required className="col-span-4  select select-bordered max-w-xs text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                            <option disabled selected>{policeStation}</option>
                            {
                                DistrictAllPoliceStation.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                            }
                        </select>

                        <div className="grid grid-cols-2 gap-4">
                            <h2 className='Weight'>Weight</h2>
                            <input required type="text" className='w-[100%]' defaultValue={weight} name='Weight' />
                        </div>

                        <button className='Update' type='submit'>Update</button>
                    </form>



                </div>

            </div>

        </div>
    );
};

export default AdminPendingDataShow;