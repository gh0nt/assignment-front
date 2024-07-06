import { Badge } from "@shadcn/components/ui/badge";
import { Button } from "@shadcn/components/ui/button";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@shadcn/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shadcn/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcn/components/ui/popover";
import { useEffect, useState } from "react";
import {
  GeneralEvaluationInfo,
  mapStatusProject,
  StatusProject,
} from "@/models/project";
import DetailEvaluation from "@/components/student/Projects/HistoricEvaluations/DetailEvaluation";
import { assignTeacherToProject } from "@/api/assignment/assignTeacherToProject";

interface EvaluationRequestedItem {
  project: GeneralEvaluationInfo;
  teachersToAssigned: { id: number | null; name: string }[];
  setListProjectsAdmin: (projects: GeneralEvaluationInfo[]) => void;
  listProjectsAdmin: GeneralEvaluationInfo[];
}

export default function EvaluationRequestedItem({
  project,
  teachersToAssigned,
  listProjectsAdmin,
  setListProjectsAdmin,
}: EvaluationRequestedItem) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>();
  const [isLoadingAssignedTeacher, setIsLoadingAssignedTeacher] =
    useState(false);
  const [messageErrorAssignedTeacher, setMessageErrorAssignedTeacher] =
    useState("");

  useEffect(() => {
    if (project.teacher) {
      setValue(project.teacher.teacherId);
    }
  }, []);

  const changeAssignedTeacher = async (newTeacherId: number | null) => {
    try {
      setIsLoadingAssignedTeacher(true);
      await assignTeacherToProject({
        projectId: Number(project.project?.projectId),
        teacherId: newTeacherId,
      });
      const listUpdate: GeneralEvaluationInfo[] = listProjectsAdmin.map(
        (actualProject) =>
          actualProject.project.projectId === project.project.projectId
            ? {
                ...actualProject,
                evaluation: {
                  ...actualProject.evaluation,
                  statusDescription:
                    newTeacherId == null
                      ? StatusProject.WAITING_FOR_REVIEWER
                      : StatusProject.IN_REVISION,
                },
              }
            : actualProject
      ) as GeneralEvaluationInfo[];
      setListProjectsAdmin(listUpdate);
      setIsLoadingAssignedTeacher(false);
    } catch (error) {
      setIsLoadingAssignedTeacher(false);
      setMessageErrorAssignedTeacher("Ha ocurrido un error al asigna docente");
    }
  };

  return (
    <div
      className="tw-max-w-4xl tw-px-10 tw-my-4 tw-py-6 tw-bg-white tw-rounded-lg"
      style={{
        border: "1px solid #e4e4e7",
      }}
    >
      <div className="tw-flex tw-justify-between tw-items-center">
        <span className="tw-font-light tw-text-gray-600 tw-text-sm">
          Solicitado en {project?.project?.projectDeliveryDate}
        </span>
        <span>
          <Badge className="tw-mr-2">
            {mapStatusProject[project?.evaluation?.statusDescription || ""]}
          </Badge>
          <Badge variant="outline">
            {project?.evaluation?.approved == 1 ? "Aprobado" : "No aprobado"}
          </Badge>
        </span>
      </div>
      <div className="tw-mt-2">
        <h3 className="tw-text-xl  tw-font-bold">
          {project?.project?.projectTitle}
        </h3>
        {project.daysRemaning.days && (
          <>
            {project.daysRemaning.days > 0 && (
              <span className="tw-flex tw-mt-2 tw-mb-5 tw-gap-2 tw-font-light tw-text-gray-600 tw-text-sm">
                <svg
                  width="15px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                El docente tiene {project?.daysRemaning?.days}{" "}
                {project?.daysRemaning?.days == 1 ? "día" : "días"} restante
                para calificar el proyecto
              </span>
            )}
            {project?.daysRemaning?.days == 0 && (
              <span className="tw-flex tw-mt-2 tw-mb-5 tw-gap-2 tw-font-light tw-text-red-600 tw-text-sm">
                {" "}
                <svg
                  width="15px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                El tiempo de evaluación del docente ha expirado
              </span>
            )}
          </>
        )}

        {project?.evaluation?.evaluationDate && (
          <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
            <span className="tw-font-bold tw-mr-2">Docente evaluador:</span>{" "}
            {project?.teacher?.teacherName}
          </p>
        )}

        {project?.student?.studentName && (
          <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
            <span className="tw-font-bold tw-mr-2">
              Estudiante solicitante:
            </span>{" "}
            Camilo Beltran
          </p>
        )}

        {project?.evaluation?.evaluationDate && (
          <div className="tw-mt-3">
            <DetailEvaluation project={project} />
          </div>
        )}

        {!project?.evaluation?.evaluationDate && (
          <div className="tw-mt-5">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  disabled={isLoadingAssignedTeacher ? true : false}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="tw-w-[500px] tw-justify-between"
                >
                  {value
                    ? teachersToAssigned.find((teacher) => teacher.id === value)
                        ?.name
                    : "Asignar docente..."}
                  <CaretSortIcon className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="tw-w-[500px] tw-p-0">
                <Command>
                  <CommandInput
                    placeholder="Buscar docente..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No se encontraron docentes.</CommandEmpty>
                    <CommandGroup>
                      {teachersToAssigned.map((teacher) => (
                        <CommandItem
                          key={teacher.id}
                          value={`${teacher.id}`}
                          onSelect={(currentValue) => {
                            const actualCurrentValue =
                              currentValue == "null"
                                ? null
                                : Number(currentValue);

                            if (actualCurrentValue != value) {
                              setValue(
                                actualCurrentValue === value
                                  ? null
                                  : currentValue == "null"
                                  ? null
                                  : Number(currentValue)
                              );
                              changeAssignedTeacher(actualCurrentValue);
                            }
                            setOpen(false);
                          }}
                        >
                          {teacher.name}
                          <CheckIcon
                            className={cn(
                              "tw-ml-auto tw-h-4 tw-w-4",
                              value === teacher.id
                                ? "tw-opacity-100"
                                : "tw-opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {isLoadingAssignedTeacher && (
              <p className="tw-text-sm tw-mt-2">
                {value != null
                  ? "Asignando docente..."
                  : "Desasignando docente..."}
              </p>
            )}
            {messageErrorAssignedTeacher && (
              <p className="tw-text-sm message-error tw-mt-2">
                {messageErrorAssignedTeacher}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
