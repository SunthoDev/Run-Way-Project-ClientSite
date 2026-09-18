import React, { useContext, useState } from 'react';
import "./Singup.css";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaArrowLeft, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

const SingUp = () => {
    let [District, setDistrict] = useState("");
    let [PoliceStation, setPoliceStation] = useState("");

    let handleDistrictData = (e) => {
        setDistrict(e.target.value);
    }
    let handlePoliceStationData = (e) => {
        setPoliceStation(e.target.value);
    }

    // Fetch police stations using TanStack query
    let { data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll");
        return res.json();
    });

    let DistrictAllPoliceStation = AllCoveragesPoliceStation?.filter(PoliceStationAll => PoliceStationAll?.AddDistrict === District);

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    let onSubmit = (data) => {
        setError("");
        setSuccess("");
        let BusinessName = data.businessName;
        let FirstName = data.firstName;
        let LastName = data.lastName;
        let Districts = District;
        let PoliceStations = PoliceStation;

        let Address = data.Address;
        let Phone = data.phone;
        let Email = data.email;
        let Password = data.password;
        let confirmPassword = data.confirmPassword;
        let date = moment().format("MM/D/YY , hh:mm A");

        if (Password !== confirmPassword) {
            setError("Please Match Your Password");
            return;
        }

        let firebaseUser = null; 

        createUser(Email, Password)
            .then(result => {
                let createUserObj = result.user;
                firebaseUser = result.user; 

                setSuccess("Your SignUp Successfully");

                updateProfile(createUserObj, { displayName: FirstName })
                    .then(() => {
                        let saveUser = { 
                            userUid: createUserObj?.uid, 
                            name: createUserObj.displayName, 
                            LastName: LastName, 
                            BusinessName, 
                            Address, 
                            Phone, 
                            Password, 
                            email: createUserObj.email, 
                            photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
                            userId: Math.round(Math.random() * 99999999).toString(), 
                            role: "user", 
                            status: "pending", 
                            Districts, 
                            PoliceStations, 
                            date 
                        };

                        fetch("https://server.trustereocourier.com.bd/users", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Congratulation New user',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                                logOutUser()
                                    .then(() => { navigate("/login"); })
                                    .catch(() => {});
                            });
                    })
                    .catch(() => {});
            })
            .catch(async (error) => {
                console.error("Database Save Failed:", error);
                setError(error.message);

                if (firebaseUser) {
                    try {
                        await firebaseUser.delete();
                        console.log("Firebase user deleted due to database failure.");
                    } catch (deleteError) {
                        console.error("Failed to delete Firebase user:", deleteError);
                    }
                }
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#120428] via-[#2a1b4e] to-[#0f0728] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Background Decorative Glowing Elements */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Back to Home Button Container */}
            <div className="absolute top-8 left-8 z-50">
                <Link
                    to="/"
                    className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                    <FaArrowLeft className="h-4 w-4 mr-2 text-purple-200 group-hover:text-white transition-colors" />
                    <span className="text-purple-200 group-hover:text-white font-medium text-sm tracking-wide transition-colors">
                        Back to Home
                    </span>
                </Link>
            </div>

            {/* Registration Card Container */}
            <div className="w-full max-w-xl bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 sm:p-10 mt-12 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-300 tracking-tight">
                        Become a Merchant
                    </h2>
                    <p className="text-sm text-purple-200/70 mt-2 font-light">
                        Register to start your seamless and secure courier journey
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Business Name */}
                    <div className="relative group">
                        <input
                            {...register("businessName", { required: true })}
                            type="text"
                            className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                            placeholder="Name of Business"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                            <FaBuilding className="text-xs" />
                        </div>
                        {errors.businessName && (
                            <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">Business name is required</p>
                        )}
                    </div>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                            <input
                                {...register("firstName", { required: true })}
                                type="text"
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                                placeholder="First Name"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                                <FaUser className="text-xs" />
                            </div>
                            {errors.firstName && (
                                <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">First name required</p>
                            )}
                        </div>
                        <div className="relative group">
                            <input
                                {...register("lastName", { required: true })}
                                type="text"
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                                placeholder="Last Name"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                                <FaUser className="text-xs" />
                            </div>
                            {errors.lastName && (
                                <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">Last name required</p>
                            )}
                        </div>
                    </div>

                    {/* District & Police Station Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <select 
                                onBlur={handleDistrictData}
                                className="w-full px-4 py-3.5 bg-[#1e1035] border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-purple-100 transition-all duration-300 cursor-pointer text-sm shadow-inner"
                                defaultValue=""
                            >
                                <option disabled value="" className="bg-[#1e1035] text-purple-300">Select District</option>
                                <option className="bg-[#1e1035] text-white">Bagerhat</option>
                                <option className="bg-[#1e1035] text-white">Bandarban</option>
                                <option className="bg-[#1e1035] text-white">Barguna</option>
                                <option className="bg-[#1e1035] text-white">Barishal</option>
                                <option className="bg-[#1e1035] text-white">Bhola</option>
                                <option className="bg-[#1e1035] text-white">Bogura</option>
                                <option className="bg-[#1e1035] text-white">Brahmanbaria</option>
                                <option className="bg-[#1e1035] text-white">Chandpur</option>
                                <option className="bg-[#1e1035] text-white">Chapainawabganj</option>
                                <option className="bg-[#1e1035] text-white">Chittagong</option>
                                <option className="bg-[#1e1035] text-white">Chuadanga</option>
                                <option className="bg-[#1e1035] text-white">Cox's Bazar</option>
                                <option className="bg-[#1e1035] text-white">Cumilla</option>
                                <option className="bg-[#1e1035] text-white">Dhaka City</option>
                                <option className="bg-[#1e1035] text-white">Dhaka Sub-Urban</option>
                                <option className="bg-[#1e1035] text-white">Dinajpur</option>
                                <option className="bg-[#1e1035] text-white">Faridpur</option>
                                <option className="bg-[#1e1035] text-white">Feni</option>
                                <option className="bg-[#1e1035] text-white">Gaibandha</option>
                                <option className="bg-[#1e1035] text-white">Gazipur</option>
                                <option className="bg-[#1e1035] text-white">Gopalganj</option>
                                <option className="bg-[#1e1035] text-white">Habiganj</option>
                                <option className="bg-[#1e1035] text-white">Jamalpur</option>
                                <option className="bg-[#1e1035] text-white">Jashore</option>
                                <option className="bg-[#1e1035] text-white">Jhalokati</option>
                                <option className="bg-[#1e1035] text-white">Jhenaidah</option>
                                <option className="bg-[#1e1035] text-white">Joypurhat</option>
                                <option className="bg-[#1e1035] text-white">Khagrachori</option>
                                <option className="bg-[#1e1035] text-white">Khulna</option>
                                <option className="bg-[#1e1035] text-white">Kishoreganj</option>
                                <option className="bg-[#1e1035] text-white">Kurigram</option>
                                <option className="bg-[#1e1035] text-white">Kustia</option>
                                <option className="bg-[#1e1035] text-white">Lalmonirhat</option>
                                <option className="bg-[#1e1035] text-white">Laxmipur</option>
                                <option className="bg-[#1e1035] text-white">Madaripur</option>
                                <option className="bg-[#1e1035] text-white">Magura</option>
                                <option className="bg-[#1e1035] text-white">Manikganj</option>
                                <option className="bg-[#1e1035] text-white">Meherpur</option>
                                <option className="bg-[#1e1035] text-white">Moulvibazar</option>
                                <option className="bg-[#1e1035] text-white">Munshiganj</option>
                                <option className="bg-[#1e1035] text-white">Mymenshingh</option>
                                <option className="bg-[#1e1035] text-white">Naogaon</option>
                                <option className="bg-[#1e1035] text-white">Narail</option>
                                <option className="bg-[#1e1035] text-white">Narayanganj</option>
                                <option className="bg-[#1e1035] text-white">Narshindi</option>
                                <option className="bg-[#1e1035] text-white">Natore</option>
                                <option className="bg-[#1e1035] text-white">Netrokona</option>
                                <option className="bg-[#1e1035] text-white">Nilphamari</option>
                                <option className="bg-[#1e1035] text-white">Noakhali</option>
                                <option className="bg-[#1e1035] text-white">Pabna</option>
                                <option className="bg-[#1e1035] text-white">Panchgarh</option>
                                <option className="bg-[#1e1035] text-white">Patuakhali</option>
                                <option className="bg-[#1e1035] text-white">Pirojpur</option>
                                <option className="bg-[#1e1035] text-white">Rajbari</option>
                                <option className="bg-[#1e1035] text-white">Rajshahi</option>
                                <option className="bg-[#1e1035] text-white">Rangamati</option>
                                <option className="bg-[#1e1035] text-white">Rangpur</option>
                                <option className="bg-[#1e1035] text-white">Shariatpur</option>
                                <option className="bg-[#1e1035] text-white">Shatkhira</option>
                                <option className="bg-[#1e1035] text-white">Sherpur</option>
                                <option className="bg-[#1e1035] text-white">Sirajganj</option>
                                <option className="bg-[#1e1035] text-white">Sunamganj</option>
                                <option className="bg-[#1e1035] text-white">Sylhet</option>
                                <option className="bg-[#1e1035] text-white">Tangail</option>
                                <option className="bg-[#1e1035] text-white">Thakurgaon</option>
                                <option className="bg-[#1e1035] text-white">Zone Not Clear</option>
                            </select>
                        </div>

                        <div className="relative">
                            <select 
                                onBlur={handlePoliceStationData}
                                className="w-full px-4 py-3.5 bg-[#1e1035] border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-purple-100 transition-all duration-300 cursor-pointer text-sm shadow-inner"
                                defaultValue=""
                            >
                                <option disabled value="" className="bg-[#1e1035] text-purple-300">Select Police Station</option>
                                {
                                    DistrictAllPoliceStation.map((PoliceStationAll, index) => (
                                        <option key={index} value={PoliceStationAll.AddPoliceStation} className="bg-[#1e1035] text-white">
                                            {PoliceStationAll.AddPoliceStation}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="relative group">
                        <input
                            {...register("Address", { required: true })}
                            type="text"
                            className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                            placeholder="Address of your Pick up Location"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                            <FaMapMarkerAlt className="text-xs" />
                        </div>
                        {errors.Address && (
                            <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">Pick up address is required</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="relative group">
                        <input
                            {...register("phone", { required: true, minLength: 11, maxLength: 14 })}
                            type="tel"
                            className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                            placeholder="Phone Number"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                            <FaPhone className="text-xs" />
                        </div>
                        {errors.phone && (
                            <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">Valid phone number is required</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                            placeholder="Email Address"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                            <FaEnvelope className="text-xs" />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">Valid email is required</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative group">
                        <input
                            {...register("password", { required: true })}
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-12 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                            placeholder="Password"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                            <FaLock className="text-xs" />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300/60 hover:text-purple-200 focus:outline-none cursor-pointer p-1"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && (
                            <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">Password is required</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative group">
                        <input
                            {...register("confirmPassword", { required: true })}
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-12 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                            placeholder="Confirm Password"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                            <FaLock className="text-xs" />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-xs text-rose-400 mt-1.5 pl-2 font-medium">Please confirm your password</p>
                        )}
                    </div>

                    {/* Error & Success Messages */}
                    {error && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-xs text-center font-medium">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-xs text-center font-medium">
                            {success}
                        </div>
                    )}

                    {/* Submit Button Container */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold shadow-[0_10px_20px_rgba(126,34,206,0.3)] hover:shadow-[0_15px_25px_rgba(126,34,206,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer text-sm tracking-wide uppercase"
                        >
                            Register Now
                        </button>
                    </div>
                </form>

                {/* Footer Sign in Link */}
                <p className="mt-8 text-center text-sm text-purple-200/70">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-purple-300 hover:text-white underline underline-offset-4 transition-colors cursor-pointer ml-1">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SingUp;