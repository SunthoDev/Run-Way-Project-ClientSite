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
        let res = await fetch("http://localhost:5000/CoveragesPoliceStationAll")
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

        fetch(`http://localhost:5000/AdminUpdateUserStandardData/${_id}`, {
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

        let ApprovedData = { ApprovedOffice: "Corporate office", ApprovedName: roles?.name, PendingDate: moment().format("MM/DD/YY , hh:mm A"), AssignRider:"No" }

        fetch(`http://localhost:5000/AdminApprovedUserStandardData/${id}`, {
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
                            <option>Habiganj</option>
                            <option>Bagerhat</option>
                            <option>Bandarban</option>
                            <option>Barguna</option>
                            <option>Barishal</option>
                            <option>Bhola</option>
                            <option>Bogra</option>
                            <option>Brahmanbaria</option>
                            <option>Chandpur</option>
                            <option>Chapainawabganj</option>
                            <option>Chittagong</option>
                            <option>Chuadanga</option>
                            <option>Cox's Bazar</option>
                            <option>Cumilla</option>
                            <option>Dhaka City</option>
                            <option>Dhaka Sub-Urban</option>
                            <option>Dinajpur</option>
                            <option>Faridpur</option>
                            <option>Feni</option>
                            <option>Gaibandha</option>
                            <option>Gazipur</option>
                            <option>Gopalganj</option>
                            <option>Jamalpur</option>
                            <option>Jashore</option>
                            <option>Jhalokati</option>
                            <option>Jhenaidah</option>
                            <option>Joypurhat</option>
                            <option>Khagrachori</option>
                            <option>Khulna</option>
                            <option>Kishoreganj</option>
                            <option>Kurigram</option>
                            <option>Kustia</option>
                            <option>Lalmonirhat</option>
                            <option>Laxmipur</option>
                            <option>Madaripur</option>
                            <option>Magura</option>
                            <option>Manikganj</option>
                            <option>Meherpur</option>
                            <option>Moulvibazar</option>
                            <option>Munshiganj</option>
                            <option>Mymenshingh</option>
                            <option>Naogaon</option>
                            <option>Narail</option>
                            <option>Narayanganj</option>
                            <option>Narshindi</option>
                            <option>Natore</option>
                            <option>Netrokona</option>
                            <option>Nilphamari</option>
                            <option>Noakhali</option>
                            <option>Pabna</option>
                            <option>Panchgarh</option>
                            <option>Patuakhali</option>
                            <option>Pirojpur</option>
                            <option>Rajbari</option>
                            <option>Rajshahi</option>
                            <option>Rangamati</option>
                            <option>Rangpur</option>
                            <option>Shariatpur</option>
                            <option>Shatkhira</option>
                            <option>Sherpur</option>
                            <option>Sirajganj</option>
                            <option>Sunamganj</option>
                            <option>Sylhet</option>
                            <option>Tangail</option>
                            <option>Thakurgaon</option>
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