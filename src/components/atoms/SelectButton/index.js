const SelectButton = ({ children, onClick }) => {
  return (
    <button
      className="w-24 text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SelectButton;
