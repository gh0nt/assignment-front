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

export default function NewProject() {
  const formSchema = z.object({
    subject: z.string({required_error : 'Debe proporcionar el tema del proyecto'}).trim().min(1, { message: "Debe ingresar el tema del proyecto" })
    ,
    projectFile: z.instanceof(File).refine(file => file.size > 0, 'El documento del proyecto es requerido')
  });

  const newProjectForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      projectFile : new File([], '')
    },
  });

  const HandlerNewProject = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
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
        <DialogFooter>
          <Button type="submit">Enviar proyecto</Button>
        </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
