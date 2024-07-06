import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@shadcn/components/ui/card";
import { Label } from "@shadcn/components/ui/label";
import { Input } from "@shadcn/components/ui/input";
import { Button } from "@shadcn/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@shadcn/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginUser } from "@/api/auth/login";
import { useState } from "react";
import { LoginUserDAO } from "@/models/auth";
import { useNavigate } from "react-router-dom";
import { mapRoles } from "@/config/roles";

export default function Login() {

  const [messageErrorLoginUser, setMessageErrorLoginUser] = useState("");
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().min(1, {
      message: "El correo es requerido.",
    }).email('Debe introducir un correo valido'),
    password: z.string().min(1, {
       message : 'La contraseña es requerida'
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const HandlerLoginUser = async (values: z.infer<typeof formSchema>) => {
    try{
      setMessageErrorLoginUser("");
      const responseLogin = await loginUser({userEmail : values.email, password : values.password})
      const responseData : LoginUserDAO = await responseLogin.data;
      window.localStorage.setItem('evaluate-project-token', responseData.token);
      window.localStorage.setItem('evaluate-project-user', JSON.stringify({
        email : responseData.email,
        role : responseData.role,
        id : responseData.id,
        name : responseData.name
      }));

      navigate(`/${mapRoles[responseData.role]}`);

    }catch(error : unknown){
        setMessageErrorLoginUser('El usuario o contraseña es incorrecto, intente de nuevo')
    }
  }
  return (
    <div className="tw-flex tw-h-screen tw-w-full tw-items-center tw-justify-center tw-bg-gray-100 tw-px-5 tw-dark:bg-gray-950">
      <div className="tw-flex tw-justify-center tw-w-full">
        <Card className="tw-w-full tw-max-w-md">
          <CardHeader className="tw-space-y-1">
            <CardTitle className="tw-text-2xl tw-font-bold">
              Iniciar sesión
            </CardTitle>
            <CardDescription>
              Ingresa tu email y contraseña para acceder a la cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="tw-space-y-4" onSubmit={form.handleSubmit(HandlerLoginUser)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="tw-space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="estudiante1@unillanos.edu.co"
                          required
                          {...field}
                        />
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="tw-space-y-2">
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <Label htmlFor="password">Contraseña</Label>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          required
                          {...field}
                        />
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="tw-w-full">
                  Ingresar
                </Button>
                <p className="message-error tw-text-sm">{messageErrorLoginUser}</p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
