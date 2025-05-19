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


    let [District, setDistrict] = useState("")
    const [roles] = useRole()

    let handleDistrictData = (e) => {
        setDistrict(e.target.value)
    }

    // Coverage All Police Station Data Find
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("http://localhost:5000/CoveragesPoliceStationAll")
        return res.json()

    })

    let DistrictAllPoliceStation = AllCoveragesPoliceStation.filter(PoliceStationAll => PoliceStationAll?.AddDistrict == District)


    // ==============================================================================



    let { user, UserEmailSendDataEntry } = useContext(AuthContext)

    // console.log(UserEmailSendDataEntry)

    let { data: userOrderStandardParcelData = [] } = useQuery(["AdminDataEntryStandardDeliveryData"], async () => {
        let res = await fetch(`http://localhost:5000/AdminDataEntryStandardDeliveryData?email=${UserEmailSendDataEntry}`)
        return res.json()

    })



    // console.log(userOrderStandardParcelData)


    // pending data find 
    let ReviewData = userOrderStandardParcelData.filter(Review => Review?.status === "Review")
    // console.log(PendingData)

    // approved data find 
    let PendingData = userOrderStandardParcelData.filter(Pending => Pending?.status == "Pending")



    // Admin user order Entry data post
    let handleAdminEntryStandardParcel = (event) => {
        event.preventDefault()
        let number = event.target.number.value
        let name = event.target.name.value
        let address = event.target.address.value
        let policeStation = event.target.policeStation.value
        let CodAmount = event.target.CodAmount.value
        let Invoice = event.target.Invoice.value
        let note = event.target.note.value
        let weight = event.target.weight.value
        let DeliveryCharge = event.target.charge.value
        let StandardParcelId = Math.round(Math.random() * 9999999).toString()
        let date = moment().format("MM/D/YY , hh:mm A")


        let AdminEntryStandardDeliveryData = { number, name, address, status: "Pending", Payment: "No", CodAmount, Invoice, note, weight, DeliveryCharge, StandardEmailUser: UserEmailSendDataEntry, StandardParcelId, date,District ,policeStation,ApprovedOffice: "Corporate office",ApprovedDate:date,ApprovedName: roles?.name}

        console.log(AdminEntryStandardDeliveryData)

        fetch("http://localhost:5000/AdminEntryStandardDeliveryData", {
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
                <div className="PendingData">
                    {

                        ReviewData.map(ReviewDataSee => <AdminPendingDataShow refetch={refetch} key={ReviewDataSee._id} ReviewDataSee={ReviewDataSee}></AdminPendingDataShow>)

                    }
                </div>

                <div onSubmit={handleAdminEntryStandardParcel} className="AdminEntryUserPar mt-14">
                    <h2 className='font-[600] text-black text-[16px]'>Add New Parcel - Unkanow </h2>
                    <div className="Horijontal bg-[#d4d2d2] mt-[4px] mb-[48px] w-[full] h-[1px]"></div>

                    <form className='StandardFromData'>
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
                                <h4 className='col-span-2 text-[16px] font-[500] '>Delivery Type</h4>
                                <div className="col-span-4  md:flex">

                                    <button className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Home Delivery</button>

                                    <button className='text-white bg-[#218838] mt-3 mt:pt-0 ml-0 md:ml-4 text-[16px] rounded-[6px] py-[8px] px-[16px]'>Point Delivery</button>

                                </div>
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Email Red only</h4>
                                <input className='col-span-4  w-[100%]' value={UserEmailSendDataEntry} />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Phone Number</h4>
                                <input  className='col-span-4  w-[100%]' type="number" name='number' />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Name</h4>
                                <input  className='col-span-4  w-[100%]' type="text" name='name' />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Address</h4>
                                <input  className='col-span-4  w-[100%]' type="text" name='address' />
                            </div>






                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>District</h4>

                                <select onBlur={handleDistrictData}  className="col-span-4 select select-bordered max-w-xs  text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                    <option disabled selected>Selected District</option>
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
                                <h4 className='col-span-2 text-[16px] font-[500] '>Police  Station</h4>
                                
                                <select name='policeStation'  className="col-span-4  select select-bordered max-w-xs text-black text-[14px] font-[600] rounded-[6px]  w-[100%]">
                                    <option disabled selected>Selected Police Station</option>
                                    {
                                        DistrictAllPoliceStation.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                                    }
                                </select>
                            </div>








                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>COD Amount</h4>
                                <input  className='col-span-4  w-[100%]' type="text" name='CodAmount' />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Invoice#</h4>
                                <input  className='col-span-4  w-[100%]' type="text" name='Invoice' />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Note</h4>
                                <input  className='col-span-4  w-[100%]' type="text" name='note' />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Wight(KG)</h4>
                                <input  className='col-span-4  w-[100%]' type="number" name='weight' />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Charge</h4>
                                <input  className='col-span-4  w-[100%]' type="text" name='charge' />
                            </div>
                            <div className="grid grid-cols-6 mt-[18px] gap-4  items-center">
                                <h4 className='col-span-2 text-[16px] font-[500] '>Exchange Parcel</h4>
                                <input  type="checkbox" className="checkbox" />
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-6 mt-[18px] gap-4  items-center">

                                <h4 className='col-span-2 text-[16px] font-[500] hidden md:inline-block'></h4>
                                <button className='col-span-4  bg-[#22A197] color-white text-[14px] text-white font-[600] rounded-[8px] w-[100%] py-[10px]' type='submit'>Submit</button>

                            </div>
                        </div>
                    </form>

                </div>

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