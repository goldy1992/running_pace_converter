import { BritishFlag, CircularBritishFlag, CircularThaiFlag, ThaiFlag } from "../components/icons/icons";

export default function SegmentedButtons() {
    return (
        <main className="w-full h-screen p-5">
            <div className="flex items-center space-x-3">
                <CircularThaiFlag className="w-[24px] h-[24px]"/> 
                <div>
                    <button className="px-4 py-2 bg-sky-600 hover:bg-sky-800 border rounded-l-3xl" name="button 1">English</button>
                    <button className="px-4 py-2 bg-sky-600 hover:bg-sky-800 border rounded-r-3xl" name="button 2" >ไทย</button>
                </div>
                <CircularBritishFlag className="w-[24px] h-[24px]" />
            </div>
        </main>
    )
}