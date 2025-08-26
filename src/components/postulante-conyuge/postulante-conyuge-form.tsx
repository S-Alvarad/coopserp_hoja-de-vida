"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { CalendarIcon, Loader2Icon, Send, Info } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

import { useConyugeForm } from '@/hooks/useConyugeForm'
import { ConyugeSchemaType } from '@/schemas/conyugeSchema'

import { tipoDocumento } from '@/constants/tipoDocumento'
import { useSelectOptions } from "@/hooks/useSelectOptions";

export function PostulanteConyugeForm({ className, ...props }: React.ComponentProps<"div">) {

   // 1. Define your form.
   const form = useConyugeForm();

   // 2. Watch form fields.
   const [loading, setLoading] = useState(false);
   const tieneTrabajo = form.watch("tiene_trabajo");

   // 3. Define your select options.
   const selectOptionsTipoDocumento = useSelectOptions(tipoDocumento);

   // 4. Log form errors.
   useEffect(() => {
      if (form.formState.errors) {
         const errors = form.formState.errors;
         if (Object.keys(errors).length > 0) {
            console.log({ errores: form.formState.errors });
         }
      }
   }, [form.formState.errors]);

   // 5. Define a submit handler.
   async function onSubmit(values: ConyugeSchemaType) {
      setLoading(true);
      console.log(values);
   }

   return (
      <>
         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
               <CardHeader className="text-start">
                  <CardTitle className="text-3xl text-primary">Información personal del conyuge.</CardTitle>
                  <CardDescription className="italic text-md text-muted-foreground">
                     Datos básicos.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="tipo_documento"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Tipo de documento</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                             <FormControl>
                                                <SelectTrigger className="w-full min-w-0 truncate">
                                                   <SelectValue placeholder="Seleccione un tipo de documento" />
                                                </SelectTrigger>
                                             </FormControl>
                                             <SelectContent position="popper" avoidCollisions={false}>
                                                {selectOptionsTipoDocumento}
                                             </SelectContent>
                                          </Select>
                                          {form.formState.errors.tipo_documento ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Seleccione un tipo de documento.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="numero_documento"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Número de documento</FormLabel>
                                          <FormControl>
                                             <Input type="number" placeholder="Ej: 123456789" {...field} />
                                          </FormControl>
                                          {form.formState.errors.tipo_documento ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="primer_nombre"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Primer nombre</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Juan" {...field} />
                                          </FormControl>
                                          {form.formState.errors.primer_nombre ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="segundo_nombre"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Segundo nombre</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Carlos" {...field} />
                                          </FormControl>
                                          {form.formState.errors.segundo_nombre ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic">
                                                Este campo no es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="primer_apellido"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Primer apellido</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Gómez" {...field} />
                                          </FormControl>
                                          {form.formState.errors.primer_apellido ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="segundo_apellido"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Segundo apellido</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Rodríguez" {...field} />
                                          </FormControl>
                                          {form.formState.errors.segundo_apellido ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic">
                                                Este campo no es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="fecha_nacimiento"
                                    render={({ field }) => (
                                       <FormItem className="flex flex-col">
                                          <FormLabel>Fecha de nacimiento</FormLabel>
                                          <Popover>
                                             <PopoverTrigger asChild>
                                                <FormControl>
                                                   <Button
                                                      variant={"outline"}
                                                      className={cn(
                                                         "w-full pl-3 text-left font-normal",
                                                         !field.value && "text-muted-foreground"
                                                      )}
                                                   >
                                                      {field.value ? (
                                                         format(field.value, "dd/MM/yyyy")
                                                      ) : (
                                                         <span>Seleccionar fecha</span>
                                                      )}
                                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                   </Button>
                                                </FormControl>
                                             </PopoverTrigger>
                                             <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                   mode="single"
                                                   selected={field.value}
                                                   onSelect={field.onChange}
                                                   disabled={(date) => {
                                                      const today = new Date();
                                                      const minDate = new Date("1900-01-01");
                                                      const maxDate = new Date(
                                                         today.getFullYear() - 18,
                                                         today.getMonth(),
                                                         today.getDate()
                                                      ); // fecha límite: hace 18 años exactos

                                                      return date > maxDate || date < minDate;
                                                   }}
                                                   captionLayout="dropdown"
                                                />
                                             </PopoverContent>
                                          </Popover>
                                          {form.formState.errors.tipo_documento ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="pais_nacimiento"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>País de nacimiento</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Colombia" {...field} />
                                          </FormControl>
                                          {form.formState.errors.pais_nacimiento ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="departamento_nacimiento"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Departamento de nacimiento</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Antioquia" {...field} />
                                          </FormControl>
                                          {form.formState.errors.departamento_nacimiento ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="ciudad_nacimiento"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Ciudad de nacimiento</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Medellín" {...field} />
                                          </FormControl>
                                          {form.formState.errors.ciudad_nacimiento ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </div>
                           <Alert variant="default">
                              <Info className="h-4 w-4" />
                              <AlertTitle>
                                 Dirección de residencia
                              </AlertTitle>
                              <AlertDescription className="italic">
                                 La dirección de residencia es obligatoria. Ej: Cra. 8 #10-47, Barrio La Merced, Cali, Valle del Cauca
                              </AlertDescription>
                           </Alert>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="barrio_residencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Barrio de residencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: La Merced" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.barrio_residencia ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="direccion_residencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Dirección de residencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Cr. 8 #10-47" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.direccion_residencia ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="ciudad_residencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Ciudad de residencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Cali" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.ciudad_residencia ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="departamento_residencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Departamento de residencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Valle del Cauca" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.departamento_residencia ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="celular"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Número de celular</FormLabel>
                                          <FormControl>
                                             <Input type="number" placeholder="Ej: 3001234567" {...field} />
                                          </FormControl>
                                          {form.formState.errors.celular ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="correo"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Correo electrónico</FormLabel>
                                          <FormControl>
                                             <Input type="email" placeholder="Ej: ejemplo@correo.com" {...field} />
                                          </FormControl>
                                          {form.formState.errors.correo ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Este campo es obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="telefono"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Teléfono</FormLabel>
                                          <FormControl>
                                             <Input type="tel" placeholder="Ej: 3001234567" {...field} />
                                          </FormControl>
                                          {form.formState.errors.telefono ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic">
                                                Este campo es no obligatorio.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="tiene_trabajo"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                             <FormControl className="scale-130">
                                                <Checkbox
                                                   checked={field.value}
                                                   onCheckedChange={field.onChange}
                                                   className="dark:data-[state=checked]:bg-emerald-400 dark:data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                                />
                                             </FormControl>
                                             <div className="space-y-1 leading-none">
                                                <span>Su conyuge tiene trabajo?</span>
                                             </div>
                                          </FormLabel>
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {tieneTrabajo && (
                                 <>
                                    <div className="grid gap-3">
                                       <FormField
                                          control={form.control}
                                          name="nombre_empresa"
                                          render={({ field }) => (
                                             <FormItem>
                                                <FormLabel>Nombre de la empresa</FormLabel>
                                                <FormControl>
                                                   <Input
                                                      type="text"
                                                      {...field}
                                                      value={field.value ?? ""}
                                                      placeholder="Ingresa el nombre de la empresa"
                                                   />
                                                </FormControl>
                                                {"nombre_empresa" in form.formState.errors ? (
                                                   <FormMessage />
                                                ) : (
                                                   <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                                                      Campo obligatorio.
                                                   </FormDescription>
                                                )}
                                             </FormItem>
                                          )}
                                       />
                                    </div>
                                    <div className="grid gap-3">
                                       <FormField
                                          control={form.control}
                                          name="direccion_empresa"
                                          render={({ field }) => (
                                             <FormItem>
                                                <FormLabel>Dirección de la empresa</FormLabel>
                                                <FormControl>
                                                   <Input
                                                      type="text"
                                                      {...field}
                                                      value={field.value ?? ""}
                                                      placeholder="Ingresa la dirección de la empresa"
                                                   />
                                                </FormControl>
                                                {"direccion_empresa" in form.formState.errors ? (
                                                   <FormMessage />
                                                ) : (
                                                   <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                                                      Campo obligatorio.
                                                   </FormDescription>
                                                )}
                                             </FormItem>
                                          )}
                                       />
                                    </div>
                                    <div className="grid gap-3">
                                       <FormField
                                          control={form.control}
                                          name="tipo_de_empresa"
                                          render={({ field }) => (
                                             <FormItem>
                                                <FormLabel>Tipo de la empresa</FormLabel>
                                                <FormControl>
                                                   <Input
                                                      type="text"
                                                      {...field}
                                                      value={field.value ?? ""}
                                                      placeholder="Ingresa el tipo de la empresa"
                                                   />
                                                </FormControl>
                                                {"tipo_de_empresa" in form.formState.errors ? (
                                                   <FormMessage />
                                                ) : (
                                                   <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                                                      Campo obligatorio.
                                                   </FormDescription>
                                                )}
                                             </FormItem>
                                          )}
                                       />
                                    </div>
                                 </>

                                 // direccion_empresa
                                 // tipo_de_empresa
                                 // telefono_empresa
                                 // ciudad_empresa
                                 // cargo_conyuge_empresa

                              )}
                           </div>
                           <Separator />
                           <Button type="submit" className="w-full text-white" disabled={loading}>
                              {loading ? (
                                 <>
                                    <Loader2Icon className="animate-spin" />
                                    Enviando...
                                 </>
                              ) : (
                                 <>
                                    <Send />
                                    Enviar
                                 </>
                              )}
                           </Button>
                           <Separator />
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div>
      </>
   )
}
