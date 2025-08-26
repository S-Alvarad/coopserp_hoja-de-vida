import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ConyugeSchema, ConyugeSchemaType } from '@/schemas/conyugeSchema'

export function useConyugeForm() {
   return useForm<ConyugeSchemaType>({
      mode: "onChange",
      resolver: zodResolver(ConyugeSchema),
      defaultValues: {
         tipo_documento: "CC",
         numero_documento: "1143994968",
         primer_nombre: "steven",
         segundo_nombre: "",
         primer_apellido: "alvarado",
         segundo_apellido: "paez",
         fecha_nacimiento: new Date("1999-02-07"),
         pais_nacimiento: "colombia",
         departamento_nacimiento: "valle del cauca",
         ciudad_nacimiento: "cali",
         barrio_residencia: "villacolombia",
         direccion_residencia: "Calle 33b #12A 15",
         ciudad_residencia: "cali",
         departamento_residencia: "valle del cauca",
         tiene_trabajo: false,
      },
      shouldUnregister: true,
   })
}
