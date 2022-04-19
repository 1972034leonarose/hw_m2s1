import React from "react";
import { func } from "prop-types";

const SelectButton = ({ children, onClick }) => (
  <button
    className="text-sm w-20text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-1 px-4 rounded"
    onClick={onClick}
  >
    {children}
  </button>
);

SelectButton.propTypes = {
  children: func,
  onClick: func,
};

export default SelectButton;