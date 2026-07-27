import React, { useContext, useState } from 'react';
import "./Singup.css"
import singUpImage from "../../../assets/SingUp/SingUp.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaArrowLeft, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';


const BackButton = () => (

    <Link
        to="/"
        className="inline-flex items-center px-5 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
    >
        <FaArrowLeft className="h-5 w-5 mr-2 text-gray-800 group-hover:text-blue-700" />
        <span className="text-gray-800 group-hover:text-blue-700 font-medium text-sm">
            Back to Home
        </span>
    </Link>
);


const SingUp = () => {

    let [District, setDistrict] = useState("")
    let [PoliceStation, setPoliceStation] = useState("")

    let handleDistrictData = (e) => {
        setDistrict(e.target.value)
    }
    let handlePoliceStationData = (e) => {
        setPoliceStation(e.target.value)
    }
    // user data all find use tenStack query 
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll")
        return res.json()

    })
    let DistrictAllPoliceStation = AllCoveragesPoliceStation?.filter(PoliceStationAll => PoliceStationAll?.AddDistrict === District)

    // console.log(AllCoveragesPoliceStation)
    // console.log(District)
    // console.log(DistrictAllPoliceStation)

    // ================================================================================

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    let onSubmit = (data) => {
        setError("")
        setSuccess("")
        let BusinessName = data.businessName
        let FirstName = data.firstName
        let LastName = data.lastName
        let Districts = District
        let PoliceStations = PoliceStation

        let Address = data.Address
        let Phone = data.phone
        let Email = data.email
        let Password = data.password
        let confirmPassword = data.confirmPassword
        let date = moment().format("MM/D/YY , hh:mm A")

        if (Password !== confirmPassword) {
            setError("Please Match Your Password")
            return
        }
        let allData = { BusinessName, FirstName, LastName, Districts, PoliceStations, Address, Phone, Email, Password, confirmPassword, date }
        // console.log(allData)

        let firebaseUser = null; // ইউজারকে ট্র্যাক করার জন্য
        // console.log(firebaseUser)

        createUser(Email, Password)
            .then(result => {
                let createUser = result.user
                firebaseUser = result.user; // ইউজার রেফারেন্স সেভ করে রাখা হলো

                setSuccess(" Your SingUp Successfully ")

                // console.log(createUser)

                // user Update 
                updateProfile(createUser, { displayName: FirstName })
                    .then(() => {
                        let saveUser = { userUid: createUser?.uid, name: createUser.displayName, LastName: LastName, BusinessName, Address, Phone, Password, email: createUser.email, photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", userId: Math.round(Math.random() * 99999999).toString(), role: "user", status: "pending", Districts, PoliceStations, date }

                        // console.log(saveUser)

                        // save user DB 
                        fetch("https://server.trustereocourier.com.bd/users", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Congratulation New user',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                logOutUser()
                                    .then(result => { navigate("/login") })
                                    .then(error => { })
                            })
                    })
                    .catch(error => {
                    })
            })
            .catch(async (error) => {
                console.error("Database Save Failed:", error);
                setError(error.message);

                if (firebaseUser) {
                    try {
                        // 🎯 await দিয়ে নিশ্চিত হওয়া হচ্ছে যে ইউজার ডিলিট সম্পন্ন হয়েছে
                        await firebaseUser.delete();
                        console.log("Firebase user deleted due to database failure.");
                    } catch (deleteError) {
                        console.error("Failed to delete Firebase user:", deleteError);
                    }
                }

                // 🎯 সব প্রসেস শেষ হওয়ার পর লোডিং বন্ধ হবে
                setIsLoading(false);
            })
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-8 left-8 z-50"
            >
                <Link
                    to="/"
                    className="inline-flex items-center px-5 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                    <FaArrowLeft className="h-5 w-5 mr-2 text-gray-800 group-hover:text-blue-700" />
                    <span className="text-gray-800 group-hover:text-blue-700 font-medium text-sm">Back to Home</span>
                </Link>
            </motion.div>
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-16">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Become a Merchant</h2>
                <p className="text-center text-gray-500 mb-6">Register to start your journey</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <input
                            {...register("businessName", { required: true })}
                            type="text"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            placeholder="Name of Business"
                        />
                        <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.businessName && (
                            <p className="text-xs text-red-500 mt-1">Business name is required</p>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <div className="relative w-1/2">
                            <input
                                {...register("firstName", { required: true })}
                                type="text"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                                placeholder="First Name"
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {errors.firstName && (
                                <p className="text-xs text-red-500 mt-1">First name is required</p>
                            )}
                        </div>
                        <div className="relative w-1/2">
                            <input
                                {...register("lastName", { required: true })}
                                type="text"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                                placeholder="Last Name"
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {errors.lastName && (
                                <p className="text-xs text-red-500 mt-1">Last name is required</p>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="relative w-1/2">
                            <select onBlur={handleDistrictData}
                                // {...register("district", { required: true })}
                                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-white"
                                defaultValue=""
                            >
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
                            {/* {errors.district && (
                                <p className="text-xs text-red-500 mt-1">District is required</p>
                            )} */}
                        </div>

                        <div className="relative w-1/2">
                            <select onBlur={handlePoliceStationData}
                                // {...register("policeStation", { required: true })}
                                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-white"
                                defaultValue=""
                            >
                                <option disabled selected>Selected Police Station</option>
                                {
                                    DistrictAllPoliceStation.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                                }
                            </select>
                            {/* {errors.policeStation && (
                                <p className="text-xs text-red-500 mt-1">Police station is required</p>
                            )} */}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            {...register("Address", { required: true })}
                            type="text"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            placeholder="Address of your Pick up Location"
                        />
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.Address && (
                            <p className="text-xs text-red-500 mt-1">Pick up address is required</p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            {...register("phone", { required: true, minLength: 11, maxLength: 14 })}
                            type="tel"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            placeholder="Phone Number"
                        />
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">Valid phone number is required</p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            placeholder="Email"
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">Valid email is required</p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            {...register("password", { required: true })}
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            placeholder="Password"
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">Password is required</p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            {...register("confirmPassword", { required: true })}
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            placeholder="Confirm Password"
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Please confirm your password</p>
                        )}
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}
                    {success && (
                        <p className="text-sm text-green-600 text-center">{success}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Register Now
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SingUp;






