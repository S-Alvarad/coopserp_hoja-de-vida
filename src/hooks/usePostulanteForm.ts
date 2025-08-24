import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostulanteSchema, PostulanteSchemaType } from '@/schemas/postulanteSchema'

export function usePostulanteForm() {
   return useForm<PostulanteSchemaType>({
      mode: "onChange",
      resolver: zodResolver(PostulanteSchema),
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
         barrio_correspondencia: "villacolombia",
         direccion_correspondencia: "Calle 33b #12A 15",
         ciudad_correspondencia: "cali",
         departamento_correspondencia: "valle del cauca",
         sexo: "M",
         tipo_sangre: "O+",
         estado_civil: "SOLTERO",
         personas_a_cargo: "0",
         celular: "3192976668",
         correo: "steven.alvarado@example.com",
         telefono: "",
         tiene_hijos: false,
      },
      shouldUnregister: true,
   })
}
