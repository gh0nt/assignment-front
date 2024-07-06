import { GeneralEvaluationInfo } from "@/models/project";
import { Button } from "@shadcn/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@shadcn/components/ui/dialog";
import { Label } from "@shadcn/components/ui/label";

interface DetailEvaluationProps {
  project: GeneralEvaluationInfo;
}

export default function DetailEvaluation({ project }: DetailEvaluationProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver detalle de evaluación</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalle de evaluación</DialogTitle>
          <DialogDescription>Estado de evaluación</DialogDescription>
        </DialogHeader>
        <Label htmlFor="name" className="text-right">
          Observaciones
        </Label>
        <p className="tw-text-sm">{project.evaluation?.feedback}</p>
        <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Estado de proyecto:</span>{" "}
          {project?.evaluation?.approved == 1 ? "Aprobado" : "No Aprobado"}
        </p>
        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Estudiante solicitante:</span>{" "}
          {project?.student?.studentName}
        </p>
        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Docente evaluador:</span>{" "}
          {project?.teacher?.teacherName}
        </p>
        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Fecha de solicitud:</span>{" "}
          {project?.project?.projectDeliveryDate}
        </p>

        <p className="tw-mt-1 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Fecha de evaluación:</span>{" "}
          {project?.evaluation?.evaluationDate}
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
  );
}
