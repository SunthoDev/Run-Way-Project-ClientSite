import React from 'react';
import "./UserPendingConsignmentInvoiceUpdate.css"
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserPendingConsignmentInvoiceUpdate = () => {


    let data = useLoaderData()
    console.log(data)

    let { _id, weight, status, policeStation, number, note, name, district, date, address, StandardParcelId, StandardEmailUser, Invoice, CodAmount, DeliveryCharge, ApprovedDate, ApprovedName, ApprovedOffice } = data



    let UserConsignmentPendingInvoiceUpdate = (event) => {
        event.preventDefault()
        let number = event.target.number.value
        let name = event.target.name.value
        let address = event.target.address.value
        let district = event.target.district.value
        let policeStation = event.target.policeStation.value
        let CodAmount = event.target.CodAmount.value
        let Invoice = event.target.Invoice.value
        let note = event.target.note.value
        let weight = event.target.weight.value
        // let Charge = event.target.Charge.value
        // let statusUp = event.target.statusUp.value

        let UserConsignmentPendingInvoiceUpdate = { number, name, address, district, policeStation, CodAmount, Invoice, note, weight }

        fetch(`http://localhost:5000/UserConsignmentPendingInvoiceUpdateData/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(UserConsignmentPendingInvoiceUpdate)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Parcel Data Update Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                // refetch()
            })

    }


    return (
        <div className='ConsignmentPendingInvoiceUpdate'>
            <div className='PendingInvoiceUpdate px-2 md:px-10 py-10'>
                <div className="InvoiceUpdate bg-white rounded-[8px] p-[24px]">

                    <h2 className='text-left font-[700] text-black text-[20px] '>Update Consignment - {StandardParcelId} </h2>
                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                    <div className="grid grid-cols-6 mt-[10px] gap-4  items-center">
                        <h4 className='col-span-2 text-[16px] font-[500] '>Merchant</h4>
                        <h4 className='col-span-2 text-left text-[18px] font-[500] '>{name}</h4>
                    </div>




                    <div className="AdminEntryUserPar mt-6">

                        <form onSubmit={UserConsignmentPendingInvoiceUpdate} className='StandardFromData'>

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
                                    <input className='col-span-4  w-[100%]' type="text" name='district' defaultValue={district} />
                                </div>

                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Police  Station</h4>
                                    <input className='col-span-4  w-[100%]' type="text" name='policeStation' defaultValue={policeStation} />
                                </div>

                                <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>COD Amount</h4>
                                    <input className='col-span-4  w-[100%]' type="text" name='CodAmount' defaultValue={CodAmount} />
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
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Exchange Parcel</h4>
                                    <input type="checkbox" className="checkbox first-line:" />
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] hidden md:inline-block'></h4>
                                    <button className='col-span-4  bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-6 mt-[18px] gap-4  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] hidden md:inline-block'></h4>
                                    <button className='col-span-4  bg-[#fa6969] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]'>Print</button>
                                </div>



                            </div>
                        </form>

                    </div>








                </div>
            </div>
        </div>
    );
};

export default UserPendingConsignmentInvoiceUpdate; 