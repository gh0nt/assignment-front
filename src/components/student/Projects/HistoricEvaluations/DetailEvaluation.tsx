import { Button } from "@shadcn/components/ui/button";
import { Dialog,DialogTrigger, DialogHeader ,DialogClose, DialogContent, DialogTitle,DialogDescription, DialogFooter} from "@shadcn/components/ui/dialog";
import { Label } from "@shadcn/components/ui/label";

export default function DetailEvaluation(){
    return <Dialog>
    <DialogTrigger asChild>
        <Button variant="outline">Ver detalle de evaluación</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Detalle de evaluación</DialogTitle>
        <DialogDescription>
            Estado de evaluación
        </DialogDescription>
      </DialogHeader>
          <Label htmlFor="name" className="text-right">
            Observaciones
          </Label>
            <p className="tw-text-sm">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laboriosam itaque vitae deserunt porro illum magnam, asperiores nam sequi possimus quos excepturi, obcaecati perspiciatis architecto quis sit culpa iusto est.
            </p>
        <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Estado de proyecto:</span> Aprobado
        </p>
        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Estudiante solicitante:</span> Camilo Beltran
        </p>
        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Docente evaluador:</span> Ana Beatriz
        </p>
        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Fecha de solicitud:</span> 2024-04-10
        </p>
       
        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Fecha de evaluación:</span> 2024-05-02
        </p>
       
      <DialogFooter>
      <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}