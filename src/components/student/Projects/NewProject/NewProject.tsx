import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@shadcn/components/ui/dialog";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import { Button } from "@shadcn/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@shadcn/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createNewProject } from "@/api/project/newProject";
import { toast } from "sonner"

export interface NewProjectProps {
  getProjects : () => void
}

export default function NewProject({getProjects} : NewProjectProps) {
  
  const [isOpenNewProjectDialog, setIsOpenNewProjectDialog] = useState(false);
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [messageErrorNewProject,setMessageErrorNewProject] = useState("");

  const formSchema = z.object({
    subject: z.string({required_error : 'Debe proporcionar el tema del proyecto'}).trim().min(1, { message: "Debe ingresar el tema del proyecto" }),
    projectFile: z.instanceof(File,{message : 'No es un archivo'}).refine(file => file.size > 0, 'El documento del proyecto es requerido')
  });

  const newProjectForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      projectFile : new File([], '')
    },
  });

  const HandlerNewProject = async (values: z.infer<typeof formSchema>) => {
    try{
      setIsCreatingNewProject(true);
      setMessageErrorNewProject("");
      const projectFormData = new FormData();
      projectFormData.append('Title', values.subject)
      projectFormData.append('Description', 'ss')
      projectFormData.append('StudentId', JSON.parse(window.localStorage.getItem('evaluate-project-user') || '').id)
      projectFormData.append('File', values.projectFile)

      await createNewProject(projectFormData)
      setIsCreatingNewProject(false);
      setIsOpenNewProjectDialog(false);
      getProjects();

      toast("Creación de proyecto", {
        description: "El proyecto se ha creado exitosamente",
      })

    }catch(error : unknown){
      setIsCreatingNewProject(false);
      setMessageErrorNewProject('Ha ocurrido un error al crear el proyecto, intente de nuevo')
    }
  };

  return (
    <Dialog open={isOpenNewProjectDialog} onOpenChange={setIsOpenNewProjectDialog}>
      <DialogTrigger asChild>
        <div className="tw-mt-10">
          <Button>Enviar proyecto a evaluar</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <Form {...newProjectForm}>
          <form
            className="tw-grid tw-gap-5 tw-py-1"
            onSubmit={newProjectForm.handleSubmit(HandlerNewProject)}
          >
        <DialogHeader>
          <DialogTitle>Envio de proyecto a evaluar</DialogTitle>
          <DialogDescription>
            Completa los campos requeridos para enviar el proyecto y sea
            evaluado por un docente especialista.
          </DialogDescription>
        </DialogHeader>
        
            <FormField
              control={newProjectForm.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <div className="tw-space-y-2">
                    <Label htmlFor="subject">Tema</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Herramienta para evaluar desempeño de estudiantes"
                      {...field}
                    />
                  </div>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={newProjectForm.control}
              name="projectFile"
              render={({field}) => (
                <FormItem>
                  <div className="tw-grid tw-w-full tw-items-center tw-gap-3">
                    <Label htmlFor="projectFile">Adjuntar proyecto*</Label>
                    <FormControl>
                      <Input
                        id="projectFile"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) =>{
                            field.onChange(e.target.files ? e.target.files[0] : null)
                        }
                          }
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    El documento debe estar en formato pdf
                  </FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
              
            />
                      <p className="message-error tw-text-sm">{messageErrorNewProject}</p>

        <DialogFooter>
          <Button type="submit" disabled={isCreatingNewProject ? true : false}>{isCreatingNewProject ? 'Creando proyecto...' : "Enviar proyecto"}</Button>

          </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
