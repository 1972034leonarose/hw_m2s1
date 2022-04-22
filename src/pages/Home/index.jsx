import React, { useEffect } from "react";
import "../../App.css";
import "./styles.css";

// components & lib
import useHandlers from "../../lib/useHandlers";
import HomeSkeleton from "../../components/layouts/HomeSkeleton";

function Home() {
  const { handleProfile } = useHandlers();

  // set user profile
  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <>
      <HomeSkeleton />
    </>
  );
}

export default Home;
