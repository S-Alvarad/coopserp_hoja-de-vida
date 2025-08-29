import { z } from "zod"
import { vacunasCovid } from '@/constants/vacunasCovid'

export const vacunasCovidSchema = z.discriminatedUnion("tiene_vacunas", [
   z.object({
      tiene_vacunas: z.literal(true),
      vacunas: z.array(
         z.object({
            nombre_vacuna: z.enum(
               vacunasCovid.map(option => option.value) as [string, ...string[]], {
               message: "Seleccione una vacuna."
            }).transform(val => val.toUpperCase()),
            dosis_suministradas: z.coerce.number({
               message: "Este campo es obligatorio."
            }).refine(val => !isNaN(Number(val)) && Number(val) > 0, {
               message: "Este campo es obligatorio y mayor a 0.",
            }),
            fechas_dosis: z.date({
               message: "La fecha de la vacuna es requerida."
            }),
         })
      ),
   }),
   z.object({
      tiene_vacunas: z.literal(false),
   })
]);

export type VacunasCovidSchemaType = z.infer<typeof vacunasCovidSchema>;