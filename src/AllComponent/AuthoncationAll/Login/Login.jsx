import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaGoogle, 
    FaGithub, 
    FaArrowLeft 
} from "react-icons/fa";
import useRole from "../../../Hook/useRole";

const BackButton = () => (
    <Link
        to="/"
        className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300 group cursor-pointer"
    >
        <FaArrowLeft className="h-4 w-4 mr-2 text-purple-200 group-hover:-translate-x-1 group-hover:text-white transition-all" />
        <span className="text-purple-200 group-hover:text-white font-medium text-sm tracking-wide transition-colors">
            Back to Home
        </span>
    </Link>
);

const Login = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser, PasswordResetAllUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const [roles] = useRole();
    const isAdmin = roles?.role === "admin";

    let redirectPath = isAdmin ? "/dashboard/AdminDashboard" : "/dashboard/dashboard";

    const onSubmit = async (data) => {
        setSuccess("");
        setError("");
        setIsLoading(true);

        try {
            await loginUser(data.email, data.password);
            setSuccess("Login successful!");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login successful!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate(redirectPath);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (email) => {
        try {
            await PasswordResetAllUser(email);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Password reset email sent!',
                showConfirmButton: false,
                timer: 1500
            });
            setShowResetModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#120428] via-[#2a1b4e] to-[#0f0728] py-12 px-4 sm:px-6 lg:px-8 relative flex items-center justify-center overflow-hidden">
            
            {/* Background Decorative Glowing Elements */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Back Button Positioned Top-Left */}
            <div className="absolute top-8 left-8 z-50">
                <BackButton />
            </div>

            {/* Main Container */}
            <div className="max-w-md w-full bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 sm:p-10 relative z-10 my-8">
                
                {/* Header Title */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-300 tracking-tight mb-2">
                        Merchant Portal
                    </h2>
                    <p className="text-sm text-purple-200/70 font-light">Sign in to manage your courier deliveries</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
                    {/* Email Field */}
                    <div className="relative group">
                        <label className="block text-xs font-medium text-purple-200/80 mb-1.5 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                                placeholder="Enter your email"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                                <FaEnvelope className="text-xs" />
                            </div>
                        </div>
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium pl-2">Email is required</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <label className="block text-xs font-medium text-purple-200/80 mb-1.5 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <input
                                {...register("password", { required: true })}
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-12 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white transition-all duration-300 placeholder:text-purple-300/40 text-sm shadow-inner"
                                placeholder="Enter your password"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-300 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-200 transition-all">
                                <FaLock className="text-xs" />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300/60 hover:text-purple-200 transition-colors p-1"
                            >
                                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium pl-2">Password is required</p>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm py-1">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 accent-purple-500 rounded border-white/20 bg-black/20 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-purple-200/80 text-xs sm:text-sm cursor-pointer select-none">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowResetModal(true)}
                            className="cursor-pointer font-medium text-purple-300 hover:text-white text-xs sm:text-sm transition-colors underline underline-offset-4"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Error and Success Messages */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full flex justify-center items-center py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold shadow-[0_10px_20px_rgba(126,34,206,0.3)] hover:shadow-[0_15px_25px_rgba(126,34,206,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Social Logins Divider */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-3 bg-transparent text-purple-300/60 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="cursor-pointer w-full inline-flex justify-center items-center py-3 px-4 bg-white/5 border border-white/10 rounded-2xl shadow-sm text-sm font-medium text-purple-200 hover:bg-white/10 hover:border-white/20 transition-all"
                        >
                            <FaGoogle className="w-4 h-4 text-rose-400 mr-2" />
                            <span className="text-xs font-semibold">Google</span>
                        </button>

                        <button
                            type="button"
                            className="cursor-pointer w-full inline-flex justify-center items-center py-3 px-4 bg-white/5 border border-white/10 rounded-2xl shadow-sm text-sm font-medium text-purple-200 hover:bg-white/10 hover:border-white/20 transition-all"
                        >
                            <FaGithub className="w-4 h-4 text-white mr-2" />
                            <span className="text-xs font-semibold">Github</span>
                        </button>
                    </div>
                </div>

                {/* Sign Up Link */}
                <p className="mt-8 text-center text-xs sm:text-sm text-purple-200/70">
                    Don't have an account?{" "}
                    <Link to="/singUp" className="font-semibold text-purple-300 hover:text-white underline underline-offset-4 transition-colors ml-1">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Password Reset Modal */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1b0c34] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
                        <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
                        <p className="text-purple-300/70 text-xs mb-5">Enter your account email to receive a password reset link.</p>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.email.value;
                            handlePasswordReset(email);
                        }}>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-white text-sm mb-5 placeholder:text-purple-300/40 shadow-inner"
                                required
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowResetModal(false)}
                                    className="cursor-pointer px-4 py-2.5 text-sm text-purple-300 hover:text-white font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                >
                                    Send Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;