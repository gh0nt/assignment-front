import { Button } from "@shadcn/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@shadcn/components/ui/dialog";
import { Label } from "@shadcn/components/ui/label";
import { toast } from "sonner";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@shadcn/components/ui/form";
import { Textarea } from "@shadcn/components/ui/textarea";
import { Switch } from "@shadcn/components/ui/switch";
import { useState } from "react";
import { generateEvaluationProject } from "@/api/evaluation/generateEvaluation";
import { GeneralEvaluationInfo, StatusProject } from "@/models/project";
import { getResource } from "@/api/project/getResource";

interface GenerateEvaluationProps {
  project: GeneralEvaluationInfo;
  setListProjectsTeacher: (projects: GeneralEvaluationInfo[]) => void;
  listProjectsTeacher: GeneralEvaluationInfo[];
}

export default function GenerateEvaluation({
  project,
  listProjectsTeacher,
  setListProjectsTeacher,
}: GenerateEvaluationProps) {
  const [isOpenGenerateEvaluationDialog, setIsOpenGenerateEvaluationDialog] =
    useState(false);
  const [isCreatingEvaluationProject, setIsCreatingEvaluationProject] =
    useState(false);
  const [messageErrorEvaluationProject, setMessageErrorEvaluationProject] =
    useState("");

  const formSchema = z.object({
    feedback: z
      .string({
        required_error:
          "Debe ingresar al menos una observación acerca del proyecto",
      })
      .trim()
      .min(1, {
        message: "Debe ingresar al menos una observación acerca del proyecto",
      }),
    isAproveed: z.boolean(),
  });

  const generateEvaluationForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
      isAproveed: false,
    },
  });

  const HandlerNewProject = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreatingEvaluationProject(true);
      setMessageErrorEvaluationProject("");

      await generateEvaluationProject(project.project.projectId, {
        feedBack: values.feedback,
        approved: values.isAproveed,
      });
      const listUpdate: GeneralEvaluationInfo[] = listProjectsTeacher.map(
        (actualProject) =>
          actualProject.project.projectId === project.project.projectId
            ? {
                ...actualProject,
                evaluation: {
                  ...actualProject.evaluation,
                  statusDescription: StatusProject.REVIEWED,
                  evaluationDate: new Date().toISOString().split("T")[0],
                  approved: values.isAproveed,
                },
              }
            : actualProject
      ) as GeneralEvaluationInfo[];

      setListProjectsTeacher(listUpdate);

      setIsCreatingEvaluationProject(false);
      setIsOpenGenerateEvaluationDialog(false);

      toast("Evaluación de proyecto", {
        description: "El proyecto se ha evaluado exitosamente",
      });
    } catch (error: unknown) {
      setIsCreatingEvaluationProject(false);
      setMessageErrorEvaluationProject(
        "Ha ocurrido un error al evaluar el proyecto, intente de nuevo"
      );
    }
  };

  const handleDownloadProject = async () => {
    // URL del archivo a descargar
    const url =
      import.meta.env.VITE_API_BASE_URL +
      "/api/project/resource/" +
      project.project.projectId;
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    await getResource(project.project.projectId);
  };

  return (
    <Dialog
      open={isOpenGenerateEvaluationDialog}
      onOpenChange={setIsOpenGenerateEvaluationDialog}
    >
      <DialogTrigger asChild>
        <Button>Evaluar Proyecto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...generateEvaluationForm}>
          <form
            className="tw-grid tw-gap-5 tw-py-1"
            onSubmit={generateEvaluationForm.handleSubmit(HandlerNewProject)}
          >
            <DialogHeader>
              <DialogTitle>Evaluar proyecto</DialogTitle>
              <DialogDescription>
                Completa los campos requeridos para enviar la evaluación y
                feedback del proyecto.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Button type="button" onClick={handleDownloadProject}>
                Descargar Documento de proyecto
              </Button>
              <p className="tw-mt-2 tw-font-light tw-text-gray-600 tw-text-sm">
                Descarga el archivo adjunto para poder evaluar el proyecto
              </p>
            </div>

            <FormField
              control={generateEvaluationForm.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <div className="tw-space-y-2">
                    <Textarea
                      rows={6}
                      placeholder="Existen faltas de ortografía en el documento"
                      className="resize-none"
                      {...field}
                    />
                  </div>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={generateEvaluationForm.control}
              name="isAproveed"
              render={({ field }) => (
                <FormItem>
                  <div className="tw-flex tw-w-full tw-items-center tw-gap-3">
                    <Switch
                      id="isAproveed"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="isAproveed">Aprobar proyecto</Label>
                  </div>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <p className="message-error tw-text-sm">
              {messageErrorEvaluationProject}
            </p>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isCreatingEvaluationProject ? true : false}
              >
                {isCreatingEvaluationProject
                  ? "Evaluando proyecto..."
                  : "Evaluar proyecto"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
