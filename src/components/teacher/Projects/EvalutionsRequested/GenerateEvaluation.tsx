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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@shadcn/components/ui/form";
import { Textarea } from "@shadcn/components/ui/textarea";
import { Switch } from "@shadcn/components/ui/switch";

export default function GenerateEvaluation() {
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

  const HandlerNewProject = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleDownloadProject = () => {
    // URL del archivo a descargar
    const fileUrl = 'https://example.com/path/to/your/file.pdf';
    const fileName = 'file.pdf';

    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    // Simular un clic en el enlace
    document.body.appendChild(link);
    link.click();
  };


  return (
    <Dialog>
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
            <Button onClick={handleDownloadProject}>
      Descargar Documento de proyecto
    </Button>
    <p className="tw-mt-2 tw-font-light tw-text-gray-600 tw-text-sm">Descarga el archivo adjunto para poder evaluar el proyecto</p>
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
                </FormItem>
              )}
            />
            <FormField
              control={generateEvaluationForm.control}
              name="isAproveed"
              render={({ field }) => (
                <FormItem>
                  <div className="tw-flex tw-w-full tw-items-center tw-gap-3">
                  <Switch id="isAproveed"    checked={field.value}
                      onCheckedChange={field.onChange} />
                  <Label htmlFor="isAproveed">Aprobar proyecto</Label>
                  </div>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Enviar evaluación</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
