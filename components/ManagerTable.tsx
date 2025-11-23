"use client"
import { useState } from "react";
import {Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,} from "@/components/ui/pagination";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { note } from "@/lib/types";
import { FaEuroSign } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { CiCreditCardOff } from "react-icons/ci";
import RejeterNote from "./rejeterNoteFrais"
import ApprouverNote from "./Approver"
import PayerNote from "./PayerNote";

type TableProps={
  expensesData:note[],
  setFilteredData: React.Dispatch<React.SetStateAction<note[]>>
  setexpensesData:React.Dispatch<React.SetStateAction<note[]>>

}

export default function ManagerTable({expensesData,setFilteredData,setexpensesData}:TableProps){
  // Pagination settings
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [rejeterNote,setRejeternote]=useState<{id:number,rejecter:boolean}>({id:0, rejecter:false})
  const [approuverrNote,setAprouverrnote]=useState<{id:number,approuver:boolean}>({id:0, approuver:false})
  const [payerNote,setPayernote]=useState<{id:number,payer:boolean}>({id:0, payer:false})

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
            <TableHead >Utilisateur</TableHead>
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
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="flex items-center">{item.amount}<FaEuroSign className="font-semibold text-gray-800 text-xs" /></TableCell>
              <TableCell>{item.date_from}</TableCell>
              <TableCell>{item.date_to}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="flex justify-center items-center gap-2">
                <button type="submit" onClick={()=>setRejeternote({id:item.id,rejecter:true})}  className="cursor-pointer rounded-sm flex gap-1 justify-center items-center bg-red-400 px-5 py-2 text-white" ><CiCreditCardOff/>rejeter</button>
                <button type="submit" onClick={()=>setAprouverrnote({id:item.id,approuver:true})}  className="cursor-pointer rounded-sm flex gap-1 justify-center items-center bg-green-300 px-5 py-2 text-gray-900" ><FcApproval/>approuver</button>
                <button type="submit" onClick={()=>setPayernote({id:item.id,payer:true})}  className="cursor-pointer rounded-sm flex gap-1 justify-center items-center bg-blue-300 px-5 py-2 text-gray-900" ><MdOutlinePayment/>payer</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>
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
      {
        rejeterNote.rejecter&&
        <RejeterNote data={expensesData} setData={setexpensesData} id={rejeterNote.id} setRejeternote={setRejeternote}/>
      }
      {
        approuverrNote.approuver&&<ApprouverNote id={approuverrNote.id} setApprouvernote={setAprouverrnote} data={expensesData}  setData={setexpensesData}/>
      }
      {
        payerNote.payer&&
        <PayerNote data={expensesData} setData={setexpensesData} id={payerNote.id}  setpayernote={setPayernote}/>
      }
    </div>
    </>)
}