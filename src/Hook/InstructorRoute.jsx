import { useContext } from "react";
import useRole from "./useRole";
import { AuthContext } from "../AllComponent/AuthoncationAll/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const InstructorRoute = ({children}) => {

    const [roles]=useRole()
    const insta= roles.role === "instructor"

    let {user,loading}=useContext(AuthContext)
    let location =useLocation()


    if (loading) {
       return <progress className="progress w-56"></progress>
    }


    if (user && insta) {
        return children
    }

    return <Navigate state={{from:location}} to="/"></Navigate>

};

export default InstructorRoute;