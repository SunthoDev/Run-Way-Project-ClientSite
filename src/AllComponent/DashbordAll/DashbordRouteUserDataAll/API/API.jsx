import React, { useContext } from 'react';
import "./API.css"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../../Hook/useRole';

const API = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo, status } = roles


    return (
        <div className="APIParent min-h-screen bg-[#F6F6F6] flex items-center justify-center px-4">
            {status === "pending" ? (
                <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-xl text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Please wait, your API access is under review.
                    </h2>
                    <p className="text-gray-500 mt-3">An admin will approve your request shortly.</p>
                </div>
            ) : (
                <div className="w-full max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Your API Credentials</h2>

                    <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-1">API Key</h4>
                            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg font-mono break-all">
                                hpomoqbpswevzbua2egylrz6idu01zez
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-1">Secret Key</h4>
                            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg font-mono break-all">
                                wi7qmca8utm3csvcdodgoymk
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default API;