import { useContext } from 'react';
import "./UserCancelParcelAll.css"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../../Hook/useRole';
import { Link } from 'react-router-dom';

const UserCancelParcelAll = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo, status } = roles


    // TODO: Data lode problems late 
    let { refetch, data: AllCancelData = [] } = useQuery(["UseAllCancelStandardData"], async () => {
        let res = await fetch(`http://localhost:5000/UseAllCancelStandardData?email=${user?.email}`)
        return res.json()
    })
    // console.log(AllCancelData)

    // Partially Delivered data find 
    let CancelData = AllCancelData.filter(Cancel => Cancel?.status == "Cancel" && Cancel?.Payment == "Yes")

    // console.log(CancelData)


    return (
        <div className='UserCancelParcelAll mx-6 my-8 rounded-[8px] p-6 bg-white'>
            {status == "pending" ?

                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>
                :
                <div className="">
                    <div className="overflow-x-auto p-4">
                        <table className="table  w-full rounded-xl shadow-md">
                            <thead className="bg-base-200 text-base-content">
                                <tr>
                                    <th>Merchant Name</th>
                                    <th>Parcel ID</th>
                                    <th>Amount</th>
                                    <th>Delivery Charge</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CancelData?.map(cancelAllData => <tr className="">
                                        <td>
                                            <p className="font-medium text-base text-gray-800">{cancelAllData?.name}</p>
                                        </td>
                                        <td>
                                            <p className="text-sm text-gray-600">{cancelAllData?.StandardParcelId}</p>
                                        </td>
                                        <td>
                                            <p className="text-sm font-semibold text-green-600">{cancelAllData?.CodAmount} ৳</p>
                                        </td>
                                        <td>
                                            <p className="text-sm text-blue-600">{cancelAllData?.DeliveryCharge} ৳</p>
                                        </td>
                                        <td>
                                            <p className="text-sm text-gray-500">{cancelAllData?.date}</p>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge badge-sm ${cancelAllData?.status === "Cancel" ? "badge-warning" : "badge-warning"}`}
                                            >
                                                {cancelAllData?.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/dashboard/UserTemporeryInvoiceAllStandardData/${cancelAllData?.StandardParcelId}`}
                                            >
                                                <button className="btn btn-sm btn-outline btn-primary">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            }

        </div>
    );
};

export default UserCancelParcelAll;






