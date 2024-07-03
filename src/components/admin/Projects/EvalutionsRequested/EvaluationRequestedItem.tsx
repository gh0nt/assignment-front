import { Badge } from "@shadcn/components/ui/badge";
import { Button } from "@shadcn/components/ui/button";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@shadcn/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shadcn/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcn/components/ui/popover"
import { useState } from "react";

export default function EvaluationRequestedItem() {
  const [teachersToAssigned, setTeachersToAssigned] = useState([
    {
      "value": "1",
      "label": "Dr. John Doe"
    },
    {
      "value": "2",
      "label": "Prof. Jane Smith"
    },
    {
      "value": "3",
      "label": "Dr. Emily Johnson"
    },
    {
      "value": "4",
      "label": "Prof. Michael Brown"
    },
    {
      "value": "5",
      "label": "Dr. Linda Davis"
    }
  ])

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div
      className="tw-max-w-4xl tw-px-10 tw-my-4 tw-py-6 tw-bg-white tw-rounded-lg"
      style={{
        border: "1px solid #e4e4e7",
      }}
    >
      <div className="tw-flex tw-justify-between tw-items-center">
        <span className="tw-font-light tw-text-gray-600 tw-text-sm">
          Solicitado en mar 10, 2024
        </span>
        <span>
          <Badge className="tw-mr-2">En revisión</Badge>
          <Badge variant="outline">No Aprobado</Badge>
        </span>
      </div>
      <div className="tw-mt-2">
        <h3 className="tw-text-xl  tw-font-bold">
          Herramienta para medir el nivel acádemico de los estudiantes de la
          Universidad de los llanos
        </h3>


        <span className="tw-flex tw-mt-2 tw-mb-5 tw-gap-2 tw-font-light tw-text-gray-600 tw-text-sm">
        <svg width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

      El docente tiene 1 día restante para calificar el proyecto
        </span>

        <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Estudiante solicitante:</span> Camilo Beltran
        </p>
        <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Docente asignado:</span> Ana Beatriz
        </p>
<div className="tw-my-5">

<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="tw-w-[500px] tw-justify-between"
        >
          {value
            ? teachersToAssigned.find((teacher) => teacher.value === value)?.label
            : "Asignar docente..."}
          <CaretSortIcon className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[500px] tw-p-0">
        <Command>
          <CommandInput placeholder="Buscar docente..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontraron docentes.</CommandEmpty>
            <CommandGroup>
              {teachersToAssigned.map((teacher) => (
                <CommandItem
                  key={teacher.value}
                  value={teacher.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {teacher.label}
                  <CheckIcon
                    className={cn(
                      "tw-ml-auto tw-h-4 tw-w-4",
                      value === teacher.value ? "tw-opacity-100" : "tw-opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
    </div>
      
    </div>
  );
}
