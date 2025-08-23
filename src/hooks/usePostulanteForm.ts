import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostulanteSchema, PostulanteSchemaType } from '@/schemas/postulanteSchema'

export function usePostulanteForm() {
   return useForm<PostulanteSchemaType>({
      mode: "onBlur",
      resolver: zodResolver(PostulanteSchema),
      defaultValues: {
         tipo_documento: "",
         numero_documento: "",
         primer_nombre: "",
         segundo_nombre: "",
         primer_apellido: "",
         segundo_apellido: "",
         fecha_nacimiento: new Date(),
         pais_nacimiento: "",
         departamento_nacimiento: "",
         ciudad_nacimiento: "",
         barrio_residencia: "",
         direccion_residencia: "",
         ciudad_residencia: "",
         departamento_residencia: "",
         barrio_correspondencia: "",
         direccion_correspondencia: "",
         ciudad_correspondencia: "",
         departamento_correspondencia: "",
         sexo: "",
         tipo_sangre: "",
         estado_civil: "",
         personas_a_cargo: 1,
         celular: "",
         correo: "",
         telefono: "",
         tiene_hijos: false,
      },
      shouldUnregister: true,
   })
}
