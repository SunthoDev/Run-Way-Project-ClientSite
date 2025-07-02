import React from 'react';
import "./CurrentBalanceDetails.css"
import { useLoaderData } from 'react-router-dom';
import CurrentBalanceDetailsAllData from './CurrentBalanceDetailsAllData/CurrentBalanceDetailsAllData';

const CurrentBalanceDetails = () => {

    let PaymentBalance = useLoaderData()
    // console.log(PaymentBalance)

    // All Delivered & PartiallyDelivered payment data find
    let CodAmountPaymentData = PaymentBalance.filter(PaymentAll => PaymentAll?.Payment == "Yes" && PaymentAll?.status == "Delivered" || PaymentAll?.Payment == "Yes" && PaymentAll?.status == "PartiallyDelivered")

    // console.log(CodAmountPaymentData)

    // total Cod Amount Balance
    const CodAmountResult = CodAmountPaymentData.reduce((prev, current) => prev + parseInt(current.CodAmount), 0);

    // console.log(CodAmountResult);

    // total Delivery Charge Balance
    const DeliveryChargeResult = CodAmountPaymentData.reduce((prev, current) => prev + parseInt(current.DeliveryCharge), 0);

    // console.log(DeliveryChargeResult);

    // Sub total balance
    let subTotal = CodAmountResult - DeliveryChargeResult
    // console.log(subTotal)

    // Cash Charge(1%) Balance
    let subTotalOnePercentCharge = subTotal * 1 / 100
    // console.log(subTotalOnePercentCharge)

    let totalBalanceUser = subTotal - subTotalOnePercentCharge
    // console.log(totalBalanceUser)



    return (
        <div className='AllCurrentBalanceDetails'>

            <div className='CurrentBalanceDetails bg-white my-8 mx-6 px-6 py-4 rounded-[7px]'>
                <h3>Balance Details</h3>

                <div class="Horijontal bg-black mt-[4px] mb-[20px] w-[full] h-[1px]"></div>

                <div className='BalanceDetailsCalculations'>

                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Total Amount Delivered</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{CodAmountResult}</h4>
                    </div>
                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Due Bills</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{DeliveryChargeResult}</h4>
                    </div>
                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Sub-Total</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{subTotal}</h4>
                    </div>

                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Cash & Risk Handling Charge(1%)</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{subTotalOnePercentCharge}</h4>
                    </div>
                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Total</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{totalBalanceUser}</h4>
                    </div>

                </div>


                <div className="ThisAllPaymentData">
                    <h3>Consignment Going to Be Cleared ({CodAmountPaymentData.length})</h3>

                    <div className="overflow-x-auto mt-4">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>ID</th>
                                    <th>INVOICE</th>
                                    <th>CUSTOMER NAME</th>
                                    <th>COD AMOUNT</th>
                                    <th>DELIVERY CHARGE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CodAmountPaymentData.map(AmountPaymentDataAll=>
                                <CurrentBalanceDetailsAllData key={AmountPaymentDataAll._id} AmountPaymentDataAll={AmountPaymentDataAll}></CurrentBalanceDetailsAllData>)
                                }


                            </tbody>

                        </table>
                    </div>




                </div>


            </div>
        </div>
    );
};

export default CurrentBalanceDetails;