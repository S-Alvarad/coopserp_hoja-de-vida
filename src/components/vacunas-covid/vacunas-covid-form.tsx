"use client"

import { cn } from "@/lib/utils"

import { Info } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { Loader } from '@/components/loader'


interface Props {
   cedula: string;
}

export function VacunasCovidForm({ cedula, className, ...props }: Props & React.ComponentProps<"div">) {
   // 1. Define your form.

   // 2. Watch form fields.

   // 3. Define your select options.

   // 4. useEffects.

   // 5. Define a submit handler.
   function onSubmit() {
      console.log("Formulario enviado");
   }

   return (
      <>
         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
               <CardHeader className="text-start">
                  <CardTitle className="text-3xl dark:text-emerald-400 text-emerald-600">Vacunas Covid</CardTitle>
                  <CardDescription className="italic text-md text-muted-foreground flex items-center gap-2">
                     Historial de vacunas contra el Covid-19.
                     <Tooltip>
                        <TooltipTrigger>
                           <Info className="h-5 w-5 dark:text-emerald-400 text-emerald-600 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent align="start" className="max-w-xs">
                           <p className="font-semibold">
                              Recolectar información de su historial de vacunas es necesario
                              para garantizar la seguridad y el bienestar dentro de nuestra
                              cooperativa.
                           </p>
                        </TooltipContent>
                     </Tooltip>
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Loader />
               </CardContent>
            </Card>
         </div>
      </>
   )
}
