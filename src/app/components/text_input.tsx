export default function TextInput({label, onChange} : {label: string, onChange : (string) => void}) {
    return (
        <div className="sm:flex-1 flex-col space-y-2">
            <label htmlFor="minutes" className="block text-xs leading-2">{label}</label>
            <input type="text" id="minutes" placeholder="0" 
                className="pl-2 py-2 border-0 rounded-md sm:leading-6 ring-1 focus:ring-inset text-sm bg-sky-100 dark:bg-neutral-600"
        onChange={(mins) => {
            let number = Number(mins.currentTarget.value)
            if (!isNaN(number)) {
                setInputMinutes(number)
            }
        }}/>
        </div>
)
}