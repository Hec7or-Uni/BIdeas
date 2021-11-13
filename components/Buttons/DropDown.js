import {useState} from "react";
import { FiChevronUp } from "react-icons/fi";

export default function DropDown ({title,content}) {
    const [ShowText1,setShowText1] = useState(false);
    return (
        <>
            <div className="bg-gray-200 rounded-md w-1/5 shadow-xl hover:scale-105 transition duration-200">    
                <button className="flex p-2 space-x-16 text-gray-800 w-full h-10 font-bold" onClick={() => setShowText1(!ShowText1)}>
                    {title}
                    <FiChevronUp className={`h-8 w-8 ml-20 duration-200 ${ShowText1 ?  "rotate-180": ""}`} />
                </button>
            </div>  
            {ShowText1 ? (
                <div className="bg-gray-200 w-4/5 h-2/5 rounded-3xl shadow-xl font-bold p-3">
                    {content}
                </div>
            ): null}
        </>
    )
}