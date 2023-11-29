export default function LanguageButton({name, selected, onClick, icon}:{ name: string, selected: boolean, onClick: ()=> void,
icon : React.ReactNode}) {

    let className = selected ?  
    "px-4 py-1 bg-sky-800 border rounded-lg ring-4" 
    :
    "px-4 py-1 bg-sky-600 hover:bg-sky-800 border rounded-lg" 
    return (
        <button 
        className={className}
        onClick={onClick} name="en">
        <div className="flex items-center space-x-1"> 
            {/* {language == "en" && <TickIcon className="w-4 h-4 me-2"/> } */}
            {icon}
            <span className="text-sm">{name}</span>
        </div>
    </button>

    )
}

/* <button type="button" class="
focus:outline-none text-white bg-green-700 
hover:bg-green-800 focus:ring-4 
focus:ring-green-300 font-medium 
rounded-lg text-sm px-5 py-2.5 
me-2 mb-2 dark:bg-green-600 
dark:hover:bg-green-700 
dark:focus:ring-green-800">Green</button> */