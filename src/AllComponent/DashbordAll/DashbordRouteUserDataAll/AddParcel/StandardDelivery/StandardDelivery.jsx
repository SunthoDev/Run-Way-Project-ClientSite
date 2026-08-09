import React, { useContext, useState } from 'react';
import "./StandardDelivery.css"
import { AuthContext } from '../../../../AuthoncationAll/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../../../Hook/useRole';


const StandardDelivery = () => {

    let { user, setStandardParcelId } = useContext(AuthContext)
    let navigate = useNavigate()
    const [roles] = useRole()
    // console.log(roles)

    // ==============================================================================
    // find all police station 
    // ==============================================================================

    let [District, setDistrict] = useState("")
    let handleDistrictData = (e) => {
        setDistrict(e.target.value)
    }
    // Coverage All Police Station Data Find
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll")
        return res.json()
    })
    let DistrictAllPoliceStation = AllCoveragesPoliceStation.filter(PoliceStationAll => PoliceStationAll?.AddDistrict == District)

    // ==============================================================================
    // Delivery type selected function
    // ==============================================================================
    const [deliveryType, setDeliveryType] = useState('Home-Delivery');

    const getLabelClasses = (selected) =>
        `px-4 py-2 rounded-lg border-2 cursor-pointer transition 
     ${selected ? 'bg-black text-white border-white' : 'bg-white text-black border-white'}`;



    // ============================================================================================================
    // All Police Station data. which is add Hub
    // =====================================================
    let { data: AllStationOfHub = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_PoliceStationWithOfHub"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/PoliceStationWithOfHub")
        return res.json()
    })
    // console.log(AllStationOfHub)

    // Find my hub to match my police station with hub police station !!
    // =======================================================================
    let MyHub = AllStationOfHub?.find(Hub => Hub?.PoliceStation === roles?.PoliceStations)
    // console.log(MyHub?.HubName)
    // MyHub:MyHub?.HubName


    // ==============================================================================
    // This parcel create use to user (APi key and Secret Key).
    // Then (Parcel Data) and (Tracking Data) save from server.   
    // ==============================================================================
    // ==========================================================================
    // (StandardDeliveryData and TrackingMessagePost) will be save from server !!
    // ==========================================================================
    // let StandardDeliveryData = {
    //     ParcelEntryFirstName: roles?.name,
    //     ParcelEntryLastName: roles?.LastName,
    //     ParcelEntryAddress: roles?.Address,
    //     ParcelEntryPhone: roles?.Phone,
    //     StandardEmailUser: roles?.email,
    //     MyHub: MyHub?.HubName ? MyHub?.HubName : "No Hub",
    //     StandardParcelId, date, time,
    //     DeliveryCharge: "60", status: "Review", Payment: "No", ParcelCategory: "Regular", AssignRider: "No",
    // }
    // let TrackingMessagePost = {
    //     userOrderIdTracking: StandardParcelId,
    //     TrackingMessage,
    //     TrackingDate: date,
    //     TrackingTime: time
    // };

    let handleStandardParcel = async (event) => {
        event.preventDefault()
        let name = event.target.name.value
        let address = event.target.address.value
        let policeStation = event.target.policeStation.value
        let AlternativePhone = event.target.AlternativePhone.value
        let RecipientEmail = event.target.RecipientEmail.value
        let number = event.target.number.value
        let CodAmount = event.target.CodAmount.value
        let Invoice = event.target.Invoice.value
        let ItemDescription = event.target.ItemDescription.value
        let note = event.target.note.value
        let weight = event.target.weight.value
        let StandardParcelId = Math.round(Math.random() * 9999999).toString()
        let date = moment().format("MM/DD/YYYY")
        let time = moment().format("hh:mm A")
        let TrackingMessage = `Your parcel has been created successfully`

        let StandardDeliveryData = {
            // ================================================= 
            // This data will be send from front-end !!
            // ================================================= 
            deliveryType, name, address, District, policeStation, AlternativePhone, RecipientEmail, number, CodAmount, Invoice, ItemDescription, note, weight,
        }

        try {
            const response = await fetch('https://server.trustereocourier.com.bd/api/create_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': roles?.Api?.ApiKey,   // 🔑 API Key
                    'secret-key': roles?.Api?.SecretKey       // 🔒 Secret Key
                },
                body: JSON.stringify(StandardDeliveryData)
            });

            // রেসপন্স JSON-এ কনভার্ট করা
            const data = await response.json();

            // 🎯 ১. যদি রেসপন্স সাকসেস (200 OK) হয়
            if (response.ok && data.success) {

                // SweetAlert সাকসেস পপ-আপ
                await Swal.fire({
                    icon: 'success',
                    title: 'Parcel Created!',
                    text: data?.message || 'Your parcel has been created successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true
                });

                // পার্সেল আইডি স্টেটে সেভ করা
                setStandardParcelId(data?.parcelId);

                // ইনভয়েস পেজে নেভিগেট করা
                navigate("/dashboard/StandardDelivery/StandardSucessInvoice");

            } else {
                // ❌ ২. ব্যাকেন্ড থেকে কোনো এরর আসলে (যেমন: 401, 403, 500)
                Swal.fire({
                    icon: 'error',
                    title: 'Creation Failed',
                    text: data?.message || 'Failed to create parcel. Please try again.',
                    confirmButtonColor: '#d33'
                });
            }

        } catch (err) {
            // 🌐 ৩. নেটওয়ার্ক এরর বা সার্ভার ডাউন থাকলে
            console.error("Network or Server Error:", err.message);

            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Unable to connect to the server. Please check your internet connection.',
                confirmButtonColor: '#d33'
            });
        }
    }


    return (
        <div className='bg-[#F6F6F6]'>

            <div className='SelectDelivery flex gap-2 items-center justify-end mr-0 md:mr-[12px]'>
                <Link to="/dashboard/StandardDelivery">
                    <button className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Regular</button>
                </Link>
                <Link to="/dashboard/ExpressDelivery">
                    <button className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Express</button>
                </Link>
                <Link to="/dashboard/PickNDropDelivery">
                    <button className='text-white bg-[#218838] mt-3 mt:pt-0 ml-0 md:ml-4 text-[16px] rounded-[6px] py-[8px] px-[16px]'>PickNDrop</button>
                </Link>
            </div>

            {/* =================================================== */}

            <div className='StandardDeliveryParent px-[12px] md:px-4 my-4'>
                <div className="StandardMain bg-white rounded-[8px] p-[28px]">

                    <h2 className='text-black font-[600] text-[20px]'>Add New Parcel (Regular Service)</h2>
                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>
                    <h3 className='text-black font-[500] text-[15px]'>PickUp Time for Regular service (9am-11pm)</h3>
                    <h4 className='text-[#fdc008] font-[600] text-[13px]'>(Big Size parcels will be picked in Day Time)</h4>

                    {/* =================================================== */}

                    <form onSubmit={handleStandardParcel} className='StandardFromData'>

                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">

                            <div className="">

                                <div className="flex">

                                    <label className={getLabelClasses(deliveryType === 'Home-Delivery')}>
                                        <input
                                            type="radio"
                                            name="Delivery"
                                            value="Home"
                                            checked={deliveryType === 'Home-Delivery'}
                                            onChange={() => setDeliveryType('Home-Delivery')}
                                            className="hidden"
                                        />
                                        Home Delivery
                                    </label>

                                    <label className={getLabelClasses(deliveryType === 'Point-Delivery')}>
                                        <input
                                            type="radio"
                                            name="Delivery"
                                            value="Point"
                                            checked={deliveryType === 'Point-Delivery'}
                                            onChange={() => setDeliveryType('Point-Delivery')}
                                            className="hidden"
                                        />
                                        Point Delivery
                                    </label>

                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Name <span className="text-red-800">*</span></h4>
                                    <input required placeholder="Enter your full name" className='col-span-4  w-[100%]' type="text" name='name' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Address <span className="text-red-800">*</span></h4>
                                    <input required placeholder="Enter your full address" className='col-span-4  w-[100%]' type="text" name='address' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>District <span className="text-red-800">*</span></h4>
                                    <select required onBlur={handleDistrictData} className="col-span-4 bg-white select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                        <option disabled selected>Selected District</option>
                                        <option>Bagerhat</option>
                                        <option>Bandarban</option>
                                        <option>Barguna</option>
                                        <option>Barishal</option>
                                        <option>Bhola</option>
                                        <option>Bogura</option>
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
                                        <option>Habiganj</option>
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
                                        <option>Zone Not Clear</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Thana <span className="text-red-800">*</span></h4>
                                    <select name='policeStation' className="col-span-4 bg-white  select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                        <option required disabled selected>Selected Police Station</option>
                                        {
                                            DistrictAllPoliceStation?.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                                        }
                                    </select>
                                </div>
                                {/* <p className='text-green-600 py-[6px]'>Disable District Field</p> */}
                                <div className="grid grid-cols-6 gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Alternative <br /> Phone <span className="text-red-800">*</span></h4>
                                    <input required placeholder="Enter your alternative phone number" className='col-span-4  w-[100%]' type="text" name='AlternativePhone' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Recipient <br /> Email</h4>
                                    <input placeholder="Enter your Recipient Email" className='col-span-4  w-[100%]' type="text" name='RecipientEmail' />
                                </div>

                            </div>

                            {/* ======================================== */}

                            <div className="">
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Phone <span className="text-red-800">*</span></h4>
                                    <input required placeholder="Enter your phone number" className='col-span-4  w-[100%]' type="number" name='number' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>COD <br /> Amount <span className="text-red-800">*</span></h4>
                                    <input required placeholder="Enter your Cod amount" className='col-span-4  w-[100%]' type="text" name='CodAmount' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Invoice#</h4>
                                    <input placeholder="Enter your invoice" className='col-span-4  w-[100%]' type="text" name='Invoice' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Item <br /> Description</h4>
                                    <input placeholder="Enter your description" className='col-span-4  w-[100%]' type="text" name='ItemDescription' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Note</h4>
                                    <input placeholder="Enter your Note" className='col-span-4  w-[100%]' type="text" name='note' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Wight(KG) <span className="text-red-800">*</span></h4>
                                    <input required placeholder="Enter your weight" className='col-span-4  w-[100%]' type="number" name='weight' />
                                </div>
                                <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                    <h4 className='col-span-2 text-[16px] font-[500] '>Exchange</h4>
                                    <input type="checkbox" className="checkbox" />
                                </div>
                                <div className="mt-[18px]">
                                    <button className='bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>
                                </div>

                            </div>

                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
};

export default StandardDelivery;