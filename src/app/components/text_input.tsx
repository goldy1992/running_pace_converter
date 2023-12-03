export default function TextInput({label, onChange} : {label: string, onChange : (string) => void}) {
    return (
        <div className="sm:flex-1 flex-col space-y-2">
            <label htmlFor={label} className="block text-xs leading-2">{label}</label>
            <input type="text" id={label} placeholder="0" 
                className="appearance-none pl-2 py-2 border-none rounded-md sm:leading-6 ring-1 ring-offset-transparent focus:ring-inset focus:dark:ring-gray-400 focus:ring-gray-600 text-sm bg-neutral-300 dark:bg-neutral-700 ring-gray-500"
                onChange={onChange}
            />
        </div>
)
}