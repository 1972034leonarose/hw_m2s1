
const SelectButton = ({children, onClick}) => {
    return (
        <button onClick={onClick}>{children}</button>
    )
}

export default SelectButton;