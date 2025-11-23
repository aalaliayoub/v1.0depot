"use client"
import Filter from "@/components/Filter"
import { useEffect, useState } from "react"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { note } from "@/lib/types"
import ManagerTable from "@/components/ManagerTable"
import { toCSV,downloadCSV } from "@/lib/csv"
import { RiDownload2Line } from "react-icons/ri";


export default function page(){
  const [isLoading,setLoading]=useState<boolean>(true)
  const [dataNote,setDataNote]=useState<note[]>([])
  const [dataNoteFilterd,setDataNoteFiltred]=useState<note[]>(dataNote)

  useEffect(()=>{
    async function getNotes(){

      let response=await fetch("/api/notes",{
        method:"GET",
        headers:{"Content-Type":"Application/json"}
      })

      let data=await response.json() as note[]

      if(response.ok){
        setDataNote(data)
        console.log(data)
      }
      else{
        toast.warning("Erreur lors de telechargement de donnees, reassyer plus tard",{position:"top-center",duration:3000} )
      }
      setLoading(false)
    }

    getNotes()
  },[ ])

  // fonction pour convirtier et telecharger les donnees en .csv
  const handleExport = () => {
    const csv = toCSV(dataNote);     
    downloadCSV(csv, "notes.csv");
  };

  if(isLoading) return <div className="w-full h-screen flex justify-center items-center "><Loader className="animate-spin" /></div>
  return(<>
    <div>
     <Filter expensesData={dataNote}  setFilteredData={setDataNoteFiltred}/>
     <ManagerTable expensesData={dataNoteFilterd} setFilteredData={setDataNoteFiltred} setexpensesData={setDataNote} />
     <div>
        <button onClick={handleExport} className="w-12 h-12 cursor-pointer rounded-full bg-amber-400 flex justify-center items-center fixed bottom-6 right-4" type="button" >
          <RiDownload2Line className="text-white h-6 w-6" />
        </button>
     </div>
    </div>
  </>)
}