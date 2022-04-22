import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }){
    const { profile } = useSelector((state) => state.auth);
    return profile ? children : <Navigate to="/"/>;
}