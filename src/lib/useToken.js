import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";

// user auth via token
function useToken() {
  let { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    if (!token && hash) {
      const temp = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      dispatch(setToken(temp));
    }
  }, []);
  return { token };
}

export default useToken;
