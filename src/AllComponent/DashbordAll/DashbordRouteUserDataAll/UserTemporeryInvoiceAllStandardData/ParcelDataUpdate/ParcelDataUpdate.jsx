import React, { useState } from 'react';
import "./ParcelDataUpdate.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from 'moment';
import useRole from '../../../../../Hook/useRole';

const ParcelDataUpdate = () => {

    let { IdParcel } = useParams()
    let navigate = useNavigate()
    const [roles] = useRole()
    // console.log(IdParcel)

    // ==========================================================
    // Parcel Data Load For Update!!
    // ==========================================================
    let { refetch, data: ParcelUpdateData = [] } = useQuery(["StandardDeliveryData"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/StandardDeliveryData?StandardParcelId=${IdParcel}`)
        return res.json()
    })
    // console.log(ParcelUpdateData)

    let { AlternativePhone, ApprovedDate, ApprovedName, ApprovedOffice, AssignRider, CodAmount, DeliveryCharge, District, Invoice, ItemDescription, MyHub, ParcelCategory, Payment, RecipientEmail, StandardEmailUser, StandardParcelId, address, date, deliveryType, name, note, number, policeStation, status, time, weight, _id } = ParcelUpdateData

    // ============================================================================================================
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)

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
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll")
        return res.json()
    })
    let DistrictAllPoliceStation = AllCoveragesPoliceStation.filter(PoliceStationAll => PoliceStationAll?.AddDistrict === Districts)


    return (
        <div className='bg-[#F6F6F6]'>

            <div className='StandardDeliveryParent px-[12px] md:px-4 my-4'>


                {/* =================================================== */}
                {/* Parcel information update bellow */}
                {/* =================================================== */}
                <div className="StandardMain bg-white rounded-[8px] p-[28px]">

                    <h2 className='text-black font-[600] text-[20px]'>Update Merchant Parcel Information</h2>
                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                    {/* =================================================== */}
                    <form
                        className='StandardFromData'
                        onSubmit={(event) => {
                            event.preventDefault()
                            let deliveryTypeUP = event.target.deliveryTypeUP.value
                            let nameUP = event.target.nameUP.value
                            let addressUP = event.target.addressUP.value
                            let DistrictUP = event.target.DistrictUP.value
                            let policeStationUP = event.target.policeStationUP.value
                            let AlternativePhoneUP = event.target.AlternativePhoneUP.value
                            let RecipientEmailUP = event.target.RecipientEmailUP.value
                            let numberUP = event.target.numberUP.value
                            let InvoiceUP = event.target.InvoiceUP.value
                            let ItemDescriptionUP = event.target.ItemDescriptionUP.value
                            let noteUP = event.target.noteUP.value
                            let weightUP = event.target.weightUP.value
                            let ParcelCategoryUP = event.target.ParcelCategoryUP.value
                            let MyHubUP = event.target.MyHubUP.value
                            let date = moment().format("MM/DD/YYYY")
                            let time = moment().format("hh:mm A")
                            let TrackingMessage = `Your parcel has been edit successfully`

                            let TrackingMessagePost = {
                                userOrderIdTracking: StandardParcelId,
                                TrackingMessage,
                                TrackingDate: date,
                                TrackingTime: time
                            };

                            let allInfo = { deliveryTypeUP, nameUP, addressUP, DistrictUP, policeStationUP, AlternativePhoneUP, RecipientEmailUP, numberUP, InvoiceUP, ItemDescriptionUP, noteUP, weightUP, ParcelCategoryUP, MyHubUP }
                            // console.log(allInfo)

                            fetch(`https://server.trustereocourier.com.bd/AdminUserOrderInvoiceUpdate/${ParcelUpdateData?._id}`, {
                                method: "PATCH",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(allInfo)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.modifiedCount > 0) {

                                        // Tracking Message is send for update parcel
                                        // ====================================================
                                        fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/AdminTrackingRequestSentOfAssignRider", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(TrackingMessagePost)
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                // console.log(data)
                                                if (data.insertedId) {
                                                    Swal.fire({
                                                        position: "top-end",
                                                        icon: "success",
                                                        title: "Parcel Information Update has been Success",
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    refetch()
                                                    // navigate(-1)
                                                }
                                            })
                                    }
                                })
                        }}
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">

                            {/* ======================================== */}
                            {/* Left Information!! */}
                            {/* ======================================== */}
                            <div className="">
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Delivery Type</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Delivery Type: {deliveryType}</h4>
                                        <select name='deliveryTypeUP' className="bg-white  select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                            <option selected>{deliveryType}</option>
                                            <option>Home-Delivery</option>
                                            <option>Point-Delivery</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Name</h4>
                                    <div className="col-span-4">
                                        <h4 className=' text-[16px] font-[500] '>Name: {name}</h4>
                                        <input defaultValue={name} className=' w-[100%]' type="text" name='nameUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Address</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Address: {address}</h4>
                                        <input defaultValue={address} className='w-[100%]' type="text" name='addressUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>District</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>District: {District}</h4>
                                        <select name='DistrictUP' onBlur={handleDistrictData} className=" bg-white select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                            <option selected>{District}</option>
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
                                        <h4 className='text-[16px] font-[500] '>Thana: {policeStation}</h4>
                                        <select name='policeStationUP' className=" bg-white  select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                            <option selected>{policeStation}</option>
                                            {
                                                DistrictAllPoliceStation.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                {/* <p className='text-green-600 py-[6px]'>Disable District Field</p> */}
                                <div className="grid grid-cols-6 gap-2 py-6 items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Alternative <br /> Phone</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Alternative Phone: {AlternativePhone}</h4>
                                        <input defaultValue={AlternativePhone} className='w-[100%]' type="text" name='AlternativePhoneUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Recipient <br /> Email</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Recipient Email: {RecipientEmail}</h4>
                                        <input defaultValue={RecipientEmail} className='w-[100%]' type="text" name='RecipientEmailUP' />
                                    </div>
                                </div>
                            </div>

                            {/* ======================================== */}
                            {/* Right Information!! */}
                            {/* ======================================== */}
                            <div className="">
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Phone</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Phone: {number}</h4>
                                        <input defaultValue={number} className='w-[100%]' type="number" name='numberUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Invoice#</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Invoice#: {Invoice}</h4>
                                        <input defaultValue={Invoice} className='w-[100%]' type="text" name='InvoiceUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Item <br /> Description</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Item Description: {ItemDescription}</h4>
                                        <input defaultValue={ItemDescription} className='w-[100%]' type="text" name='ItemDescriptionUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Note</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Note: {note}</h4>
                                        <input defaultValue={note} className='w-[100%]' type="text" name='noteUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Wight(KG)</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Wight(KG): {weight}</h4>
                                        <input defaultValue={weight} className='w-[100%]' type="number" name='weightUP' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Parcel Category</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>Parcel Category: {ParcelCategory}</h4>
                                        <select name='ParcelCategoryUP' className="bg-white  select select-bordered  text-black text-[14px] font-[600] rounded-[6px] w-[100%]">
                                            <option selected>{ParcelCategory}</option>
                                            <option>Express</option>
                                            <option>Regular</option>
                                            <option>PickNDrop</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>My Hub</h4>
                                    <div className="col-span-4">
                                        <h4 className='text-[16px] font-[500] '>My Hub: {MyHub}</h4>
                                        <select required className="col-span-4 w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            name="MyHubUP"
                                        >
                                            <option selected>{MyHub}</option>
                                            {AllHubFind?.map((hubName, i) => (
                                                <option key={i}>
                                                    {hubName?.NameOfHub}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-[18px]">
                                    <button className='bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>
                                </div>

                            </div>

                        </div>

                    </form>
                </div>

                {/* =================================================== */}
                {/* Delivery Charge update of Parcel */}
                {/* =================================================== */}
                <div className="StandardMain bg-white rounded-[8px] p-[28px]">
                    <h2 className='text-black font-[600] text-[20px]'>Update delivery charge amount of parcel !!</h2>
                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>
                    {/* =================================================== */}

                    <div className="AmountChange w-[100%] md:w-[50%] mt-[30px]">
                        <h2 className='text-black font-[600] text-[16px] text-center'>Delivery charge Amount !!</h2>

                        <form onSubmit={(event) => {
                            event.preventDefault()
                            let DeliveryChargeAmountUp = event.target.DeliveryChargeUP.value
                            let date = moment().format("MM/DD/YYYY")
                            let time = moment().format("hh:mm A")
                            let TrackingMessage = `Delivery charge change ${ParcelUpdateData?.DeliveryCharge} to ${DeliveryChargeAmountUp} by ${roles?.name}`

                            let TrackingMessagePost = {
                                userOrderIdTracking: ParcelUpdateData?.StandardParcelId,
                                TrackingMessage,
                                TrackingDate: date,
                                TrackingTime: time
                            };
                            let DeliveryChargeAmountChangeData = { DeliveryChargeAmountUp }

                            // Parcel Delivery Charge Amount Change request send
                            // ===========================================================
                            fetch(`https://server.trustereocourier.com.bd/AdminChangeDeliveryChargeOfParcel/${ParcelUpdateData?._id}`, {
                                method: "PATCH",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(DeliveryChargeAmountChangeData)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.modifiedCount > 0) {
                                        // Delivery Change Tracking Message Send to Admin !!
                                        // =========================================================
                                        fetch("https://server.trustereocourier.com.bd/DeliveryChargeTrackingMessageSendToAdmin", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(TrackingMessagePost)
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                // console.log(data)
                                                if (data.insertedId) {
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'success',
                                                        title: 'Delivery amount change successful',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    refetch()
                                                    event.target.reset()
                                                    navigate(-1)
                                                }
                                            })
                                    }
                                })
                        }}>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Delivery charge amount</h4>
                                <input className='col-span-4  w-[100%]' type="number" name='DeliveryChargeUP' defaultValue={DeliveryCharge} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] hidden md:inline-block'></h4>
                                <button className='col-span-4  bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* =================================================== */}
                {/* Cod Amount update of Parcel */}
                {/* =================================================== */}
                <div className="StandardMain bg-white rounded-[8px] p-[28px]">
                    <h2 className='text-black font-[600] text-[20px]'>Update cod amount of parcel !!</h2>
                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>
                    {/* =================================================== */}

                    <div className="AmountChange w-[100%] md:w-[50%] mt-[30px]">
                        <h2 className='text-black font-[600] text-[16px] text-center'>Cod Amount !!</h2>

                        <form onSubmit={(event) => {
                            event.preventDefault()
                            let codAmountUp = event.target.CodAmount.value
                            let date = moment().format("MM/DD/YYYY")
                            let time = moment().format("hh:mm A")
                            let TrackingMessage = `Cod change ${ParcelUpdateData?.CodAmount} to ${codAmountUp} by ${roles?.name}`

                            let TrackingMessagePost = {
                                userOrderIdTracking: ParcelUpdateData?.StandardParcelId,
                                TrackingMessage,
                                TrackingDate: date,
                                TrackingTime: time
                            };
                            let AmountChangeData = {
                                CodAmount: codAmountUp,
                                AmountChangeDate: date,
                                AmountChangeAdminStatus: "unverified"
                            }

                            // Parcel Amount Amount Change request send
                            // ===========================================================
                            fetch(`https://server.trustereocourier.com.bd/AdminConsignmentPendingInvoiceAmountChange/${ParcelUpdateData?._id}`, {
                                method: "PUT",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(AmountChangeData)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.modifiedCount > 0) {
                                        // Cod Change Tracking Message Send to Admin !!
                                        // =========================================================
                                        fetch("https://server.trustereocourier.com.bd/CodChangeTrackingMessageSendToAdmin", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(TrackingMessagePost)
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                // console.log(data)
                                                if (data.insertedId) {
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'success',
                                                        title: 'Parcel cod change successful',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    refetch()
                                                    event.target.reset()
                                                    navigate(-1)
                                                }
                                            })
                                    }
                                })
                        }}>
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

export default ParcelDataUpdate;