import {Navigate, Outlet} from "react-router-dom";


export const IsAuthenticated = () => {
   const token = localStorage.getItem('token');

   if(token){
      return <Outlet />
   }else  {
      return <Navigate to={"/login"}/>
   }
};