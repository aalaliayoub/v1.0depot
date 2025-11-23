"use client";

import { useState } from "react";
import { useEffect } from "react";
import { note } from "@/lib/types";
import Filter from "@/components/Filter";
import ExpensesTable from "@/components/ExpenseTable";
import ExpensesForm from "@/components/ExpenseForm";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function page() {

  const [expensesData,setexpensesData]=useState<note[]>([])
  const[FilteredData,setFilteredData]=useState<note[]>(expensesData)
  const [isOpen,setOpen]=useState<boolean>(false)
  const [isLoading,setLoading]=useState<boolean>(true)

  useEffect(()=>{
    async function getNotes(){
        let reponse=await fetch("/api/notes",{
            method:"GET",
            headers:{"Content-Type":"Application/json"}
        })

        let data=await reponse.json() as note[];

        if(reponse.ok){
            setexpensesData(data)
            setFilteredData(data)
            console.log(data)
        }
        setLoading(false)
    }
    
    getNotes()

  },[])

  if(isLoading) return <div className="w-full h-screen flex justify-center items-center "><Loader className="animate-spin"></Loader></div>
  return (<>
    <Filter expensesData={expensesData} setFilteredData={setFilteredData} />
    <ExpensesTable expensesData={FilteredData} setFilteredData={setFilteredData} setexpensesData={setexpensesData}/>
    {isOpen&&<ExpensesForm expensesData={expensesData} setFilteredData={setexpensesData} setOpen={setOpen} />}
    <div className="fixed right-2 bottom-7">
      <Button onClick={()=>setOpen(!isOpen)} type="button" className="rounded-full h-10 w-10 bg-amber-400 flex justify-center items-center cursor-pointer"><span className="text-4xl flex justify-center items-center">+</span></Button>
    </div>
  </>);
}
