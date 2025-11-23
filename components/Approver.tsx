"use client"
import { GiThink } from "react-icons/gi";
import {approuverProps} from '../lib/types'


export default function ApproverNote({data,setData,id,setApprouvernote}:approuverProps){

    // si button approuver est cliquer cette function modifier le status de note avec id en approuver
    // et faire mettre ajour la liste de donner avec le nouveau status de note
    const handleClick=()=>{
        setData(prev =>
            prev.map(item =>
                item.id === id
                ? { ...item, status: "approuver" }
                : item
            )
        )
        setApprouvernote({id:0,approuver:false})
    }

    return(<>
    
    <div className="w-full h-screen bg-black/50 fixed top-0 flex justify-center items-center left-0 ">
        <div className="bg-white flex justify-center items-center flex-col gap-5 p-10 rounded-sm shadow-md shadow-black">
           <div>
                <GiThink className="w-12 h-12 text-orange-500" />
           </div>
            <div>
                <p className="text-gray-500">Est ce que vous vouler vraiment approuver cette note de frais</p>
            </div>
            <div className="flex gap-12 items-center ">
                <button type="button" onClick={()=>setApprouvernote({id:0,approuver:false})} className="bg-gray-400 px-10 py-2 rounded-lg text-white cursor-pointer">Annuler</button>
                <button type="button" onClickCapture={handleClick} className="bg-green-400 px-10 py-2 rounded-lg text-white cursor-pointer">Approuver</button>
            </div>
        </div>
    </div>
    
    </>)
}