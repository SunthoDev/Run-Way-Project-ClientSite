import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import singUpImage from "../../../assets/SingUp/SingUp.png"
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaGoogle, 
    FaGithub, 
    FaArrowLeft,
    FaUser,
    FaPhone
} from "react-icons/fa";
import useRole from "../../../Hook/useRole";

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

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser, PasswordResetAllUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const [roles] = useRole()
    const isAdmin = roles?.role === "admin"

    let redirectPath = isAdmin ? "/dashboard/AdminDashboard" : "/dashboard/dashboard"

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-8 left-8 z-50"
            >
                <BackButton />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-16"
            >
                <div className="px-8 pt-8 pb-6">
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Login Merchant Panel
                        </h2>
                        <p className="text-gray-600">Please sign in to your account</p>
                    </motion.div>

                    <motion.form
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-6"
                    >
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <input
                                        {...register("email", { required: true })}
                                        type="email"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        Email is required
                                    </motion.p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <input
                                        {...register("password", { required: true })}
                                        type={showPassword ? "text" : "password"}
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                        placeholder="Enter your password"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-600" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-600" />
                                        )}
                                    </motion.button>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        Password is required
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => setShowResetModal(true)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Forgot password?
                            </motion.button>
                        </motion.div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-sm text-red-600 text-center"
                                >
                                    {error}
                                </motion.p>
                            )}

                            {success && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-sm text-green-600 text-center"
                                >
                                    {success}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                "Sign in"
                            )}
                        </motion.button>
                    </motion.form>

                    <motion.div variants={itemVariants} className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
                            >
                                <FaGoogle className="w-5 h-5" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
                            >
                                <FaGithub className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.p variants={itemVariants} className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/singUp" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </motion.p>
                </div>
            </motion.div>

            <AnimatePresence>
                {showResetModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
                        >
                            <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const email = e.target.email.value;
                                handlePasswordReset(email);
                            }}>
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <div className="mt-4 flex justify-end space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => setShowResetModal(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Send Reset Link
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;