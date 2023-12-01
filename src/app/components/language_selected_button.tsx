export default function LanguageButton({name, selected, onClick, icon}:{ name: string, selected: boolean, onClick: ()=> void,
icon : React.ReactNode}) {

    let className = selected ?  
    "px-4 py-1 bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-500 rounded-lg ring-2 ring-gray-600 dark:ring-gray-300 dark:bg-sky-600  " 
    :
    "px-4 py-1 bg-sky-400 dark:bg-sky-800 hover:bg-sky-700 dark:hover:bg-sky-500 rounded-lg" 
    return (
        <button 
        className={className}
        onClick={onClick} name="en">
        <div className="flex items-center space-x-1"> 
            {/* {language == "en" && <TickIcon className="w-4 h-4 me-2"/> } */}
            {icon}
            <span className="text-sm text-gray-800 dark:text-gray-200">{name}</span>
        </div>
    </button>

    )
}
