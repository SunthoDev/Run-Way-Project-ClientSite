import React, { useContext, useState } from 'react';
import "./AdminEntryParcelOrApproved.css"
import { AuthContext } from '../../../../AuthoncationAll/AuthProvider/AuthProvider';
import AdminPendingDataShow from './AdminPendingDataShow/AdminPendingDataShow';
import AdminApprovedDataShow from './AdminApprovedDataShow/AdminApprovedDataShow';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import useRole from '../../../../../Hook/useRole';


const AdminEntryParcelOrApproved = () => {

    const [roles] = useRole()
    let { user, UserEmailSendDataEntry } = useContext(AuthContext)
    // console.log(UserEmailSendDataEntry)

    // ==========================================================
    // User entry all parcel data find of (REVIEW) status 
    // ==========================================================
    let { data: userOrderStandardParcelData = [] } = useQuery(["AdminDataEntryStandardDeliveryData"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/AdminDataEntryStandardDeliveryData?email=${UserEmailSendDataEntry}`)
        return res.json()

    })
    // console.log(userOrderStandardParcelData)

    // This function filter (pending) data
    // ======================================
    let ReviewData = userOrderStandardParcelData.filter(Review => Review?.status === "Review")
    // console.log(PendingData)

    // This function filter (approved) data
    // ======================================
    let PendingData = userOrderStandardParcelData.filter(Pending => Pending?.status == "Pending")


    // ==========================================================================================================
    // Coverage all Police station find of district
    // ==========================================================================================================
    let [District, setDistrict] = useState("")
    let handleDistrictData = (e) => {
        setDistrict(e.target.value)
    }
    // Coverage All Police Station Data Find
    // ========================================================
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
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)


    //  Admin can entry user parcel here then to post database
    // ==================================================================
    let handleAdminEntryStandardParcel = (event) => {
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
        let MyHub = event.target.HubName.value
        let StandardParcelId = Math.round(Math.random() * 9999999).toString()
        let date = moment().format("MM/DD/YYYY")
        let time = moment().format("hh:mm A")

        let AdminEntryStandardDeliveryData = {
            deliveryType, name, address, District, policeStation, AlternativePhone, RecipientEmail, number, CodAmount, Invoice, ItemDescription, note, weight, StandardEmailUser: UserEmailSendDataEntry, StandardParcelId, date, time, DeliveryCharge: "60", status: "Pending", Payment: "No", ParcelCategory: "Regular", AssignRider: "No",
            ApprovedOffice: "Corporate office", PendingDate: date, ApprovedName: roles?.name, MyHub
        }
        // console.log(AdminEntryStandardDeliveryData)

        fetch("https://server.trustereocourier.com.bd/AdminEntryStandardDeliveryData", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(AdminEntryStandardDeliveryData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Date Entry Success',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
                refetch()
                event.target.reset()
            })
    }




    return (
        <div className='AdminEntryParcelOrApproved py-8 px-2 md:px-4'>

            <div className="AdminEntryParcel py-6 px-4  bg-white rounded-[8px]">

                {/* ============================================================== */}
                {/* User Pending data show here */}
                {/* ============================================================== */}
                <div className="PendingData">
                    {

                        ReviewData.map(ReviewDataSee => <AdminPendingDataShow refetch={refetch} key={ReviewDataSee._id} ReviewDataSee={ReviewDataSee}></AdminPendingDataShow>)

                    }
                </div>

                {/* ============================================================== */}
                {/* Admin Entry User Parcel below Start */}
                {/* ============================================================== */}
                <div className='StandardDeliveryParent px-[12px] md:px-4 my-4'>

                    <div className="StandardMain bg-white rounded-[8px] p-[28px]">
                        <h2 className='text-black font-[600] text-[20px]'>Add New Parcel (Regular Service)</h2>
                        <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>
                        <h3 className='text-black font-[500] text-[15px]'>PickUp Time for Regular service- 4pm-8pm</h3>
                        <h4 className='text-[#fdc008] font-[600] text-[13px]'>(Big Size parcels will be picked in Day Time)</h4>

                        {/* =================================================== */}

                        <form onSubmit={handleAdminEntryStandardParcel} className='StandardFromData'>
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
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Name</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='name' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Address</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='address' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>District</h4>
                                        <select onBlur={handleDistrictData} className="col-span-4 bg-white select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                            <option disabled selected>Selected District</option>
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
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Thana</h4>
                                        <select name='policeStation' className="col-span-4 bg-white  select select-bordered  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                            <option disabled selected>Selected Police Station</option>
                                            {
                                                DistrictAllPoliceStation.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                                            }
                                        </select>
                                    </div>
                                    {/* <p className='text-green-600 py-[6px]'>Disable District Field</p> */}
                                    <div className="grid grid-cols-6 gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Alternative <br /> Phone</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='AlternativePhone' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Recipient <br /> Email</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='RecipientEmail' />
                                    </div>

                                </div>

                                {/* ======================================== */}

                                <div className="">
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Phone</h4>
                                        <input className='col-span-4  w-[100%]' type="number" name='number' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>COD <br /> Amount</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='CodAmount' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Invoice#</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='Invoice' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Item <br /> Description</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='ItemDescription' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Note</h4>
                                        <input className='col-span-4  w-[100%]' type="text" name='note' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Wight(KG)</h4>
                                        <input className='col-span-4  w-[100%]' type="number" name='weight' />
                                    </div>
                                    <div className="grid grid-cols-6 mt-[18px] gap-2  items-center">
                                        <h4 className='col-span-2 text-[16px] font-[500] '>Hub Name</h4>
                                        <select required className="col-span-4 w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            name="HubName"
                                        >
                                            <option value="">-- Select Hub Name --</option>
                                            {AllHubFind?.map((hubName, i) => (
                                                <option key={i}>
                                                    {hubName?.NameOfHub}
                                                </option>
                                            ))}
                                        </select>
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

                {/* ============================================================== */}
                {/* User approved data show here*/}
                {/* ============================================================== */}
                <div className="Horijontal bg-[#d4d2d2] mt-[50px] mb-[48px] w-[full] h-[1px]"></div>

                <div className="ApprovedData">

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='TableHead'>
                                <tr>
                                    <th>DATE</th>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>UNNON</th>
                                    <th>AMOUNT </th>
                                    <th>AMOUNT 2</th>
                                    <th>VIEW</th>
                                    <th>PRINT</th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    PendingData.map(PendingDataSee => <AdminApprovedDataShow key={PendingDataSee._id} PendingDataSee={PendingDataSee}></AdminApprovedDataShow>)

                                }

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminEntryParcelOrApproved;


