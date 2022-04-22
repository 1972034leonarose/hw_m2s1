import React, { useEffect } from "react";
import "../../App.css";
import "./styles.css";
// components & lib
import useHandlers from "../../lib/useHandlers";
import HomeSkeleton from "../../components/layouts/HomeSkeleton";

function Home() {
  const { handleProfile } = useHandlers();

  // sets user profile on first render
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
