"use client"
import { IoMdWarning } from "react-icons/io";
import { Button } from "./ui/button";
import { note } from "@/lib/types";
import { toast } from "sonner";

type deleteType={
    id:number
    isOpen:boolean
}
type DeleteProps={
    expensesData:note[],
    setFilteredData: React.Dispatch<React.SetStateAction<note[]>>,
    setOpen: React.Dispatch<React.SetStateAction<deleteType>>,
    id:number
}
export default function DeleteCArd({expensesData,setFilteredData,setOpen,id}:DeleteProps){

    const handleSuppression=()=>{
        const new_data:note[]=expensesData.filter(note=>note.id!=id)
        setFilteredData(new_data)
        setOpen({id:0,isOpen:false})
        toast.success("note supprime avec sucess 😊",{position:"top-center",duration:3000})

    }


    const AnnulerSuppression=()=>{
        setOpen({id:0,isOpen:false})
    }


    return(<>
        <div className="w-full h-screen flex justify-center items-center fixed top-0 bg-black/45">
            <div className="bg-white shadow-xs shadow-black rounded-lg flex flex-col gap-6 justify-center items-center py-5 px-12">
                <IoMdWarning className="w-10 h-12 text-red-600" />
                <p className="text-md text-gray-800 font-semibold">Est ce que vous voullez supprimer cette note de frais</p>
                <div className=" w-full flex justify-evenly items-center">
                    <Button onClick={AnnulerSuppression} type="button" className="px-6 py-2 bg-red-500 text-white cursor-pointer ">Annuler supprission</Button>
                    <Button onClick={handleSuppression} type="button" className="px-10 py-2 bg-red-500 text-white cursor-pointer">Supprimer</Button>
                </div>
            </div>
        </div>
    </>)
}