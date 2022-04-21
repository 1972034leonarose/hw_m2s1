import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }){
    let { profile } = useSelector((state) => state.auth);
    return profile ? children : <Navigate to="/"/>;
}