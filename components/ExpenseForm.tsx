"use client"
import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { note } from "@/lib/types"
import { toast } from "sonner"
import { ImCross } from "react-icons/im";


type FormProps={
    expensesData:note[],
    setFilteredData: React.Dispatch<React.SetStateAction<note[]>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ExpensesForm({expensesData,setFilteredData,setOpen}:FormProps){

    let defaultValue:note={
        id:crypto.getRandomValues(new Uint16Array(1))[0],
        userId:121,
        category:"",
        amount:0,
        description:"",
        currency:"EUR",
        date_from:"",
        date_to:"",
        status:"draft"
    }

    const [new_note,setNewNote]=useState<note>(defaultValue)
    const [Erreurs,setErreurs]=useState<string[]>([])
 
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let {name,value}=e.target
        setNewNote({...new_note,[name]:value})
        if(Erreurs.indexOf(name)!=-1){
            let FilteredErreurs=Erreurs.filter(er=>er!=name)
            setErreurs(FilteredErreurs)
        }
        if(Erreurs.indexOf("date erreur")!=-1){
            let FilteredErreurs=Erreurs.filter(er=>er!='date erreur')
            setErreurs(FilteredErreurs)
        }
    }

    const handleBlur=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let {name,value}=e.target
        if(value=="" || value==" "){
            setErreurs([...Erreurs,name])
        }
    }
    const handleClick=()=>{
        const d1 = new Date(new_note.date_from);
        const d2 = new Date(new_note.date_to);
        if(d1>=d2){
            setErreurs([...Erreurs,'date erreur'])
            toast.error("Ooops! Des erreurs ont été détectées dans le formulaire. Merci de les corriger.",{position:"bottom-center" ,duration:2000})
        }
        else{
            setFilteredData([...expensesData,new_note])
            setNewNote({
                id:crypto.getRandomValues(new Uint32Array(1))[0],
                userId:121,
                category:"",
                amount:0,
                description:"",
                currency:"EUR",
                date_from:"",
                date_to:"",
                status:"draft"
            })
            toast.success("note de frais ajoute avec success",{position:"top-center",duration:3000})
            setOpen(false)
        }
        
    }

    return(<>
    <div className=" w-full min-h-screen flex justify-center items-center bg-black/75 fixed top-0 ">
        <div className="flex justify-center items-center flex-col bg-white px-10 py-5 rounded-sm max-h-[550px] overflow-y-auto">
            <div className="flex  justify-center items-center py-auto">
                <h1 className="font-semibold">Modifier votre note de frais</h1>
                <ImCross onClick={()=>setOpen(false)} className="translate-x-28 -translate-y-4 w-3 h-3 text-xs cursor-pointer"/>
            </div>
            <div className="space-y-4 mt-4 w-96">
                <div className="space-y-2">
                    <Label>Categorie</Label>
                    <Input type="text" name="category" value={new_note.category} className={`${Erreurs.indexOf("category")!=-1&&'text-red-500 border-red-400'}`} placeholder="Entrer la cetgorie de note frais" onChange={handleChange} onBlur={handleBlur}></Input>
                    {Erreurs.indexOf("category")!=-1&&<span className="text-red-500 text-xs">Categorie est requie</span>}
                </div>
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Input type="text" name="description" value={new_note.description} className={`${Erreurs.indexOf("description")!=-1&&'text-red-500 border-red-400'}`} placeholder="Entrer la description de note frais" onChange={handleChange} onBlur={handleBlur}></Input>
                    {Erreurs.indexOf("description")!=-1&&<span className="text-red-500 text-xs">description est requie</span>}
                </div>
                <div className="space-y-2">
                    <Label>Montant</Label>
                    <Input type="number" name="amount" value={new_note.amount} className={`${Erreurs.indexOf("amount")!=-1&&'text-red-500 border-red-400'}`} placeholder="Entrer le montant de note frais" onChange={handleChange} onBlur={handleBlur}></Input>
                    {Erreurs.indexOf("amount")!=-1&&<span className="text-red-500 text-xs">Monatnt est requie</span>}
                </div>
                <div className="space-y-2">
                    <Label>date de début de mission</Label>
                    <Input type="date" name="date_from" value={new_note.date_from} className={`${(Erreurs.indexOf("date_to")!=-1 || Erreurs.indexOf("date erreur")!=-1)&&'text-red-500 border-red-400'}`} onChange={handleChange} onBlur={handleBlur}></Input>
                    {Erreurs.indexOf("date_from")!=-1&&<span className="text-red-500 text-xs">date debut est requie</span>}
                </div>
                <div className="space-y-2">
                    <Label>date de fin de mission</Label>
                    <Input type="date" name="date_to"  value={new_note.date_to} className={`${(Erreurs.indexOf("date_to")!=-1 || Erreurs.indexOf("date erreur")!=-1)&&'text-red-500 border-red-400'}`}  onChange={handleChange} onBlur={handleBlur}></Input>
                    {Erreurs.indexOf("date_to")!=-1&&<span className="text-red-500 text-xs">date fin est requie</span>}
                    {Erreurs.indexOf("date erreur")!=-1&&<span className="text-red-500 text-xs">La date de début ne peut pas être postérieure à la date de fin.</span>}
                </div>
                <div className="w-full flex justify-center items-center pt-6">
                    <Button disabled={Erreurs.length!=0} type="button" className="w-full cursor-pointer bg-green-400 hover:bg-green-600" onClick={handleClick}>Ajouter la note</Button>
                </div>
            </div>
        </div>
    </div>
    </>)
}