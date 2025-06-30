import React, { useState } from 'react';
import "./AdminConsignmentPendingInvoiceUpdate.css"
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const AdminConsignmentPendingInvoiceUpdate = () => {


    let [district, setDistrict] = useState("")
    let handleDistrictData = (e) => {
        setDistrict(e.target.value)
    }

    // Coverage All Police Station Data Find
    // =========================================================
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("http://localhost:5000/CoveragesPoliceStationAll")
        return res.json()
    })

    let DistrictAllPoliceStation = AllCoveragesPoliceStation.filter(PoliceStationAll => PoliceStationAll?.AddDistrict == district)
    // =========================================================

    let data = useLoaderData()
    // console.log(data)

    let { _id, weight, status, policeStation, number, note, name, District, date, address, StandardParcelId, StandardEmailUser, Invoice, CodAmount, DeliveryCharge, ApprovedDate, ApprovedName, ApprovedOffice } = data


    // update Admin user parcel 
    // ____________________________________________
    let AdminConsignmentPendingInvoiceUpdate = (event) => {
        event.preventDefault()
        let number = event.target.number.value
        let name = event.target.name.value
        let address = event.target.address.value

        let policeStation = event.target.policeStation.value

        let Invoice = event.target.Invoice.value
        let note = event.target.note.value
        let weight = event.target.weight.value
        let Charge = event.target.Charge.value
        let statusUp = event.target.statusUp.value

        let ConsignmentPendingInvoiceUpdate = { number, name, address, district, policeStation, Invoice, note, weight, Charge, statusUp }


        // console.log(ConsignmentPendingInvoiceUpdate)



        fetch(`http://localhost:5000/AdminConsignmentPendingInvoiceUpdateData/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(ConsignmentPendingInvoiceUpdate)
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


    // update Admin user Cod Amount
    // ____________________________________________
    let AdminChangeAmountParcel = (event) => {
        event.preventDefault()
        let CodAmount = event.target.CodAmount.value

        let AmountChangeData = { CodAmount, AmountChangeDate: moment().format("MM/D/YY , hh:mm A"), AmountChangeAdminStatus: "unverified" }


        fetch(`http://localhost:5000/AdminConsignmentPendingInvoiceAmountChange/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(AmountChangeData)
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
                // refetch()
            })





    }


    return (
        <div className='ConsignmentPendingInvoiceUpdate'>
            <div className='PendingInvoiceUpdate px-2 md:px-8 py-10'>
                <div className="InvoiceUpdate bg-white rounded-[8px] p-[24px]">

                    <h2 className='text-left font-[700] text-black text-[20px] '>Update Consignment - {StandardParcelId} </h2>
                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                    <div className="grid grid-cols-6 mt-[10px] gap-4  items-center">
                        <h4 className='col-span-2 text-[16px] font-[500] '>Merchant</h4>
                        <h4 className='col-span-2 text-left text-[18px] font-[500] '>{name}</h4>
                    </div>

                    {/* Admin Update Parcel Data */}
                    {/* ========================================= */}

                    <div className="AdminEntryUserPar mt-6">
                        <form onSubmit={AdminConsignmentPendingInvoiceUpdate} className='StandardFromData'>
                            <div className="w-[100%] md:w-[50%] mt-[44px]">
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Category</h4>
                                    <div className="col-span-4  md:flex">

                                        <button className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Regular</button>

                                        <button className='text-white bg-[#218838] mt-3 mt:pt-0 ml-0 md:ml-4 text-[16px] rounded-[6px] py-[8px] px-[16px]'>Document</button>

                                        <button className='text-white bg-[#218838] mt-3 mt:pt-0 ml-0 md:ml-4 text-[16px] rounded-[6px] py-[8px] px-[16px]'>Book</button>

                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Email Red only</h4>
                                    <input className='col-span-4  w-[100%]' value={StandardEmailUser} />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Phone Number</h4>
                                    <input className='col-span-4  w-[100%]' type="number" name='number' defaultValue={number} />
                                </div>

                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Name</h4>
                                    <input className='col-span-4  w-[100%]' type="text" name='name' defaultValue={name} />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Address</h4>
                                    <input className='col-span-4  w-[100%]' type="text" name='address' defaultValue={address} />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>District</h4>
                                    <select onBlur={handleDistrictData} required className="bg-white col-span-4 select select-bordered max-w-xs  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
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
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>police Station</h4>
                                    <select name='policeStation' required className="bg-white col-span-4  select select-bordered max-w-xs text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                        <option disabled selected>{policeStation}</option>
                                        {
                                            DistrictAllPoliceStation.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Invoice#</h4>
                                    <input className='col-span-4  w-[100%]' type="text" name='Invoice' defaultValue={Invoice} />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Note</h4>
                                    <input className='col-span-4  w-[100%]' type="text" name='note' defaultValue={note} />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Wight(KG)</h4>
                                    <input className='col-span-4  w-[100%]' type="number" name='weight' defaultValue={weight} />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Charge</h4>
                                    <input className='col-span-4  w-[100%]' type="text" name='Charge' defaultValue={DeliveryCharge} />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Exchange Parcel</h4>
                                    <input type="checkbox" className="checkbox first-line:" />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Status</h4>
                                    <select name='statusUp' className="bg-white select col-span-4 select-bordered w-[100%] max-w-xs">
                                        <option disabled selected>{status}</option>
                                        <option>Delivered</option>
                                        <option>PartiallyDelivered</option>
                                        <option>Cancel</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] hidden md:inline-block'></h4>
                                    <button className='col-span-4  bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>

                                </div>
                                {/* <div className="grid grid-cols-1 md:grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] hidden md:inline-block'></h4>
                                    <button className='col-span-4  bg-[#fa6969] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]'>Print</button>
                                </div> */}
                            </div>
                        </form>
                    </div>


                    {/* Admin Change Parcel Amount  */}
                    {/* ========================================= */}
                    <div className="Horijontal bg-[#d4d2d2] mt-[60px] w-[full] h-[1px]"></div>

                    <div className="AmountChange w-[100%] md:w-[50%] mt-[30px]">
                        <h2 className='text-black font-[600] text-[16px] text-center'>Change Amount</h2>

                        <form onSubmit={AdminChangeAmountParcel}>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>COD Amount</h4>
                                <input className='col-span-4  w-[100%]' type="text" name='CodAmount' defaultValue={CodAmount} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] hidden md:inline-block'></h4>
                                <button className='col-span-4  bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>

                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminConsignmentPendingInvoiceUpdate;