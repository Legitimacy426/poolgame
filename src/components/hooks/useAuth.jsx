import { useEffect } from "react"

const useAuth = () => {
    const userId = localStorage.getItem("uid")
   
    useEffect(() => {
        if (!userId) {
            location.href = "/"

            
        } 
       
    },[])
   return({userId}) 
}

export default useAuth