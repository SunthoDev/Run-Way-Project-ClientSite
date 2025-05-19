import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { PacmanLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {

    let { user, loading } = useContext(AuthContext)

    let location = useLocation()


    // console.log(user,loading)

    if (loading) {
        //    return <progress className="progress w-56"></progress>
        return <div className="absolute top-[50%] left-[50%] translate-[-50%,-50%]">
            <PacmanLoader
                color="#36d7b7"
                loading
                margin={6}
                size={37}
                speedMultiplier={4}
            />
        </div>
    }

    if (user) {
        return children
    }
    return <Navigate state={{ from: location }} to="/login"></Navigate>
};

export default PrivateRoute;