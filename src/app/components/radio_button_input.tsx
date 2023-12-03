
export default function RadioButtonInput({label, isChecked, onChange} :
    {
        label:string,
        isChecked: boolean,
        onChange: ()=>void
    }) {
    return (
        <div className="sm:flex-none flex items-center gap-x-3">
        <input type="radio" id={label} checked={isChecked} onChange={onChange} />
        <label htmlFor={label} className="pr-2 text-sm">{label}</label>
    </div> 
    )
}