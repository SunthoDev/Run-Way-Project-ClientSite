import { useContext } from 'react';
import "./UserCancelParcelAll.css"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UserCancelParcelAllDataSee from './UserCancelParcelAllDataSee/UserCancelParcelAllDataSee';
import useRole from '../../../../Hook/useRole';

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


    console.log(CancelData)


    return (
        <div className='UserCancelParcelAll mx-6 my-8 rounded-[8px] p-6 bg-white'>
            {status == "pending" ?

                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>

                :

                <div className='CancelParcelAll '>
                    <h2 className='text-[18px] font-[600] text-black text-center'>All Cancel Parcel</h2>

                    {
                        CancelData.map(cancelAllData => <UserCancelParcelAllDataSee key={cancelAllData._id} cancelAllData={cancelAllData} refetch={refetch}></UserCancelParcelAllDataSee>)
                    }

                </div>
            }

        </div>
    );
};

export default UserCancelParcelAll;






