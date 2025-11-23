"use client"
import { useState } from "react";
import {Pagination,PaginationContent,PaginationEllipsis,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,} from "@/components/ui/pagination";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { note } from "@/lib/types";
import { FaEuroSign } from "react-icons/fa";
import UpdateForm from "@/components/UpdateForm";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteCArd from "./CardDelete";

type updateForm={
  id:number,
  isOpen:boolean
}
type TableProps={
  expensesData:note[],
  setFilteredData: React.Dispatch<React.SetStateAction<note[]>>
  setexpensesData:React.Dispatch<React.SetStateAction<note[]>>

}

export default function ExpensesTable({expensesData,setFilteredData,setexpensesData}:TableProps){
  // Pagination settings
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [noteUpdate,setNoteUpdate]=useState<updateForm>({id:0,isOpen:false})
  const [noteDelete,setNoteDelete]=useState<updateForm>({id:0,isOpen:false})

  // Calculate pages
  const totalPages = Math.ceil(expensesData.length / itemsPerPage);

  // Slice data for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = expensesData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
    

    return(<>
    
    <div className="space-y-6 px-10 mt-5 pb-10">

      {/* TABLE */}
      <Table className="">
        <TableCaption>Liste des notes de frais</TableCaption>
        <TableHeader>
          <TableRow >
            <TableHead >ID</TableHead>
            <TableHead >Catégorie</TableHead>
            <TableHead >Description</TableHead>
            <TableHead >Montant</TableHead>
            <TableHead >Date debut </TableHead>
            <TableHead >date fin</TableHead>
            <TableHead >Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>#{item.id}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="flex items-center">{item.amount}<FaEuroSign className="font-semibold text-gray-800 text-xs" /></TableCell>
              <TableCell>{item.date_from}</TableCell>
              <TableCell>{item.date_to}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="flex justify-center items-center gap-2">
                <button type="submit" onClick={()=>setNoteUpdate({id:item.id,isOpen:true})} className="cursor-pointer rounded-sm flex gap-1 justify-center items-center bg-emerald-300 px-5 py-2 text-gray-900" ><FaRegEdit/>modifier</button>
                <button type="submit" onClick={()=>setNoteDelete({id:item.id,isOpen:true})} className="cursor-pointer rounded-sm flex gap-1 justify-center items-center bg-red-300 px-5 py-2 text-gray-900" ><RiDeleteBinLine/>Supprimer</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <Pagination>
        <PaginationContent>

          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>

          {/* Page buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink className=""
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>

    </div>
    {
      noteUpdate.isOpen&&<UpdateForm expensesData={expensesData} setFilteredData={setexpensesData} setOpen={setNoteUpdate} id={noteUpdate.id}/>
    }
    {
      noteDelete.isOpen&&<DeleteCArd  expensesData={expensesData} setFilteredData={setexpensesData} setOpen={setNoteDelete} id={noteDelete.id}/>
    }
    </>)
}