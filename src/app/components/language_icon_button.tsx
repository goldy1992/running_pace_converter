
export default function LanguageIconButton({src, selected, onSelected, className} :
    {src: string,
        selected: boolean,
        onSelected?: () => void, 
        className?: string}) {
            let classNameToUse = className + " w-[30px] h-[30px] rounded-full"
            if (selected) {
                classNameToUse += " outline outline-neutral-800 dark:outline-neutral-200 outline-offset-2"
            } else {
                classNameToUse += " opacity-50"
            }
        return (
            <img className={classNameToUse} src={src} onClick={onSelected} />

        )
    }