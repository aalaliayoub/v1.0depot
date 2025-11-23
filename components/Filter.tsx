"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { RotateCcw } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { note } from "@/lib/types"

type FilterProps = {
  expensesData: note[]
  setFilteredData: React.Dispatch<React.SetStateAction<note[]>>
}

export default function Filter({ setFilteredData, expensesData }: FilterProps) {
  const [selectedStatus, setStatus] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [dateFrom, setDateFrom] = useState<string>("")
  const [dateTo, setDateTo] = useState<string>("")

  // Use useMemo to avoid recalculating unique values on every render
  const uniqueValues = useMemo(() => {
    return {
      status: Array.from(new Set(expensesData.map((note) => note.status))).filter(Boolean),
      category: Array.from(new Set(expensesData.map((note) => note.category))).filter(Boolean),
      dateFrom: Array.from(new Set(expensesData.map((note) => note.date_from))).filter(Boolean),
      dateTo: Array.from(new Set(expensesData.map((note) => note.date_to))).filter(Boolean),
    }
  }, [expensesData])

  useEffect(() => {
    if(category=="all_items_reset"){
        setCategory("")
    }
    if(selectedStatus=="all_items_reset"){
        setStatus("")
    }
    if(dateFrom=="all_items_reset"){
        setDateFrom("")
    }
    if(dateTo=="all_items_reset"){
        setDateTo("")
    }
    const filteredData = expensesData.filter(
      (item) =>
        (!category || item.category === category) &&
        (!selectedStatus || item.status === selectedStatus) &&
        (!dateFrom || item.date_from === dateFrom) &&
        (!dateTo || item.date_to === dateTo),
    )
    setFilteredData(filteredData)
  }, [selectedStatus, category, dateFrom, dateTo, expensesData, setFilteredData])

  const handleReset = () => {
    setCategory("")
    setDateFrom("")
    setDateTo("")
    setStatus("")
  }

  return (
    <div className="w-full p-6 border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Statut</Label>
          <Select value={selectedStatus} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tous les status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_items_reset" className="text-muted-foreground italic">
                Tous les status
              </SelectItem>
              {uniqueValues.status.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Catégorie</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_items_reset" className="text-muted-foreground italic">
                Toutes les catégories
              </SelectItem>
              {uniqueValues.category.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date From Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Date de début</Label>
          <Select value={dateFrom} onValueChange={setDateFrom}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Toutes les dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_items_reset" className="text-muted-foreground italic">
                Toutes les dates
              </SelectItem>
              {uniqueValues.dateFrom.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date To Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Date de fin</Label>
          <Select value={dateTo} onValueChange={setDateTo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Toutes les dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_items_reset" className="text-muted-foreground italic">
                Toutes les dates
              </SelectItem>
              {uniqueValues.dateTo.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full gap-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors bg-transparent"
        >
          <RotateCcw className="h-4 w-4" />
          Réinitialiser
        </Button>
      </div>
    </div>
  )
}
