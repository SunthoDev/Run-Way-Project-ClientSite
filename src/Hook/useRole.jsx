import { useContext } from "react"
import { AuthContext } from "../AllComponent/AuthoncationAll/AuthProvider/AuthProvider"
import { useQuery } from "@tanstack/react-query"



let useRole = () => {

    let { user, loading } = useContext(AuthContext)

    // let token=localStorage.getItem("accessToken")

    const { refetch, data: roles = {} } = useQuery({

        queryKey: ["userRoleCheck", user?.email],

        enabled: !loading && !!user?.email,

        queryFn: async () => {
            const response = await fetch(`https://server.trustereocourier.com.bd/userRoleCheck/${user?.email}`);
            // console.log(response)
            let data = await response.json();
            return data
        }
    })
  
    return [roles, refetch]
    // console.log(roles)
}

export default useRole