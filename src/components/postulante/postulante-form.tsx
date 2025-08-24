"use client"

import { useMemo, useEffect, useState } from "react";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader } from '@/components/loader'
import { Info, Send } from 'lucide-react'

import { usePostulanteForm } from '@/hooks/usePostulanteForm'
import { PostulanteSchemaType } from '@/schemas/postulanteSchema'
import { tipoDocumento } from '@/constants/tipoDocumento'
import { sexo } from '@/constants/sexo'
import { tipoSangre } from '@/constants/tipoSangre'
import { estadoCivil } from '@/constants/estadoCivil'

type Option = {
   value: string;
   label: string;
};

export const useSelectOptions = (options: Option[]) => {
   return useMemo(() => {
      return options.length > 0 ? (
         options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
               {option.label}
            </SelectItem>
         ))
      ) : (
         <SelectItem value="no-options" disabled>
            No hay opciones disponibles
         </SelectItem>
      );
   }, [options]);
};

export function PostulanteForm({ className, ...props }: React.ComponentProps<"div">) {

   // 1. Define your form.
   const form = usePostulanteForm();

   // 2. Watch form fields.
   const tieneHijos = form.watch("tiene_hijos")
   const [loading, setLoading] = useState(false);

   // 3. Define your select options.
   const selectOptionsTipoDocumento = useSelectOptions(tipoDocumento);
   const selectOptionsSexo = useSelectOptions(sexo);
   const selectOptionsTipoSangre = useSelectOptions(tipoSangre);
   const selectOptionsEstadoCivil = useSelectOptions(estadoCivil);

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
   async function onSubmit(values: PostulanteSchemaType) {
      setLoading(true);

      try {
         const response = await fetch(`http://localhost:4000/api/postulante`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
         });

         const data = await response.json();
         console.log(data);

         if (!response.ok) {
            setLoading(false);
            return;
         }

         setTimeout(() => {
            setLoading(false);
            form.reset();
         }, 1500);
      } catch (error) {
         console.error("Error al enviar datos:", error);
         setLoading(false);
      }
   }

   return (
      <>
         {loading && <Loader />}
         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
               <CardHeader className="text-start">
                  <CardTitle className="text-3xl text-primary">Información personal.</CardTitle>
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
                           <Separator />
                           <Alert variant="default">
                              <Tooltip>
                                 <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 cursor-pointer" />
                                 </TooltipTrigger>
                                 <TooltipContent side="left" className="bg-white text-black">
                                    <p>Ejemplo de formato: Cra. 8 #10-47, Barrio La Merced, Cali</p>
                                 </TooltipContent>
                              </Tooltip>
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
                           <Separator />
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="barrio_correspondencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Barrio de correspondencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: La Merced" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.barrio_correspondencia ? (
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
                                    name="direccion_correspondencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Dirección de correspondencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Cr. 8 #10-47" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.direccion_correspondencia ? (
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
                                    name="ciudad_correspondencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Ciudad de correspondencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Cali" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.ciudad_correspondencia ? (
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
                                    name="departamento_correspondencia"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Departamento de correspondencia</FormLabel>
                                          <FormControl>
                                             <Input placeholder="Ej: Valle del Cauca" {...field} style={{ fontStyle: "italic" }} />
                                          </FormControl>
                                          {form.formState.errors.departamento_correspondencia ? (
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
                           </div>
                           <Separator />
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="sexo"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Sexo</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                             <FormControl>
                                                <SelectTrigger className="w-full min-w-0 truncate">
                                                   <SelectValue placeholder="Seleccione su sexo" />
                                                </SelectTrigger>
                                             </FormControl>
                                             <SelectContent position="popper" avoidCollisions={false}>
                                                {selectOptionsSexo}
                                             </SelectContent>
                                          </Select>
                                          {form.formState.errors.sexo ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Seleccione su sexo.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="tipo_sangre"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Tipo de sangre</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                             <FormControl>
                                                <SelectTrigger className="w-full min-w-0 truncate">
                                                   <SelectValue placeholder="Seleccione su tipo de sangre" />
                                                </SelectTrigger>
                                             </FormControl>
                                             <SelectContent position="popper" avoidCollisions={false}>
                                                {selectOptionsTipoSangre}
                                             </SelectContent>
                                          </Select>
                                          {form.formState.errors.tipo_sangre ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Seleccione su tipo de sangre.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="estado_civil"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Estado civil</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                             <FormControl>
                                                <SelectTrigger className="w-full min-w-0 truncate">
                                                   <SelectValue placeholder="Seleccione su estado civil" />
                                                </SelectTrigger>
                                             </FormControl>
                                             <SelectContent position="popper" avoidCollisions={false}>
                                                {selectOptionsEstadoCivil}
                                             </SelectContent>
                                          </Select>
                                          {form.formState.errors.estado_civil ? (
                                             <FormMessage />
                                          ) : (
                                             <FormDescription className="italic dark:text-emerald-400 text-emerald-600">
                                                Seleccione su estado civil.
                                             </FormDescription>
                                          )}
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="grid gap-3">
                                 <FormField
                                    control={form.control}
                                    name="personas_a_cargo"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Número de personas a cargo</FormLabel>
                                          <FormControl>
                                             <Input type="number" placeholder="Ej: 1 persona" {...field} />
                                          </FormControl>
                                          {form.formState.errors.personas_a_cargo ? (
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
                                    name="tiene_hijos"
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
                                                <span>Tiene hijos?</span>
                                             </div>
                                          </FormLabel>
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              {tieneHijos && (
                                 <div className="grid gap-3">
                                    <FormField
                                       control={form.control}
                                       name="numero_hijos"
                                       render={({ field }) => (
                                          <FormItem>
                                             <FormLabel>Número de hijos</FormLabel>
                                             <FormControl>
                                                <Input
                                                   type="number"
                                                   {...field}
                                                   value={field.value ?? ""}
                                                   placeholder="Ingresa No° numero de hijos"
                                                />
                                             </FormControl>
                                             {"numero_hijos" in form.formState.errors ? (
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
                              )}
                           </div>
                           <Button type="submit" className="w-full" >
                              <Send />
                              Enviar
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
