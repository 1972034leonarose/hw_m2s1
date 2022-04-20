import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { setToken } from "../redux/authSlice";

function useToken() {
  let { token } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    
    if (!token && hash) {
      const str = hash.substring(1).split("&");
      str.forEach((char) => {
        const [key, value] = char.split("=");
        if (key === "access_token") {
          console.log(key);
          console.log(value);
          dispatch(setToken(value));
        }
      });
    }
  }, []);

  return { token };
}

export default useToken;
