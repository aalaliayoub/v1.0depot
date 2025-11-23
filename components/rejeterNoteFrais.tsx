"use client"
import { GiThink } from "react-icons/gi";
import {rejeterProps} from '../lib/types'


export default function RejeterNote({data,setData,id,setRejeternote}:rejeterProps){

    // si button rejecter est cliquer cette function modifier le status de note avec id en rejected
    // et faire mettre ajour la liste de donner avec le nouveau status de note
    const handleClick=()=>{
        setData(prev =>
            prev.map(item =>
                item.id === id
                ? { ...item, status: "rejected" }
                : item
            )
        )
        setRejeternote({id:0,rejecter:false})
    }

    return(<>
    
    <div className="w-full h-screen bg-black/50 fixed top-0 flex justify-center items-center left-0 ">
        <div className="bg-white flex justify-center items-center flex-col gap-5 p-10 rounded-sm shadow-md shadow-black">
           <div>
                <GiThink className="w-12 h-12 text-orange-500" />
           </div>
            <div>
                <p className="text-gray-500">Est ce que vous vouler vraiment rejeter cette note de frais</p>
            </div>
            <div className="flex gap-12 items-center ">
                <button type="button" onClick={()=>setRejeternote({id:0,rejecter:false})} className="bg-gray-400 px-10 py-2 rounded-lg text-white cursor-pointer">Annuler</button>
                <button type="button" onClickCapture={handleClick} className="bg-red-400 px-10 py-2 rounded-lg text-white cursor-pointer">Rejeter</button>
            </div>
        </div>
    </div>
    
    </>)
}