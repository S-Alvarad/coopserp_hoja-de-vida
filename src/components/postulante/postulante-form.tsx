"use client"

import { useMemo, useEffect } from "react";
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
import { Info, Send } from 'lucide-react'

import { usePostulanteForm } from '@/hooks/usePostulanteForm'
import { PostulanteSchemaType } from '@/schemas/postulanteSchema'
import { tipoDocumento } from '@/constants/tipoDocumento'
import { sexo } from '@/constants/sexo'

export function PostulanteForm({ className, ...props }: React.ComponentProps<"div">) {
   // 1. Define your form.
   const form = usePostulanteForm();

   // 2. Define a submit handler.
   function onSubmit(values: PostulanteSchemaType) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
   }
   // 3. Define your select options.
   const selectOptionsTipoDocumento = useMemo(() => {
      return tipoDocumento.length > 0
         ? tipoDocumento.map((option) => (
            <SelectItem key={option.value} value={option.value}>
               {option.label}
            </SelectItem>
         ))
         : (
            <SelectItem value="No hay opciones disponibles" disabled />
         );
   }, []);

   const selectOptionsSexo = useMemo(() => {
      return sexo.length > 0
         ? sexo.map((option) => (
            <SelectItem key={option.value} value={option.value}>
               {option.label}
            </SelectItem>
         ))
         : (
            <SelectItem value="No hay opciones disponibles" disabled />
         );
   }, []);

   // 4. Log form errors.
   useEffect(() => {
      if (form.formState.errors) {
         const errors = form.formState.errors;
         if (Object.keys(errors).length > 0) {
            console.log({ errores: form.formState.errors });
         }
      }
   }, [form.formState.errors]);

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader className="text-start">
               <CardTitle className="text-2xl" style={{color: "#099584"}}>Información personal.</CardTitle>
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
                                          <Input placeholder="Ej: 123456789" {...field} />
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
                                                disabled={(date) =>
                                                   date > new Date() || date < new Date("1900-01-01")
                                                }
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
                        <Alert variant="emerald">
                           <Info className="h-4 w-4" />
                           <AlertTitle>Direccion de residencia</AlertTitle>
                           <AlertDescription className="italic">
                              direccion donde vives Ej: Cra. 8 #10-47, Barrio La Merced, Cali, Valle del Cauca
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        </div>
                        <Button type="submit" className="w-full" style={{ backgroundColor: "#099584", color: "white" }}>
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
   )
}
