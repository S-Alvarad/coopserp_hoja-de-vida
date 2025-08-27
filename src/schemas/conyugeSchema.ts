import { z } from "zod"
import { tipoDocumento } from '@/constants/tipoDocumento'

const tieneTrabajoSchema = z.discriminatedUnion("tiene_trabajo", [
   z.object({
      tiene_trabajo: z.literal(true),
      nombre_empresa: z.string().min(1, {
         message: "El nombre de la empresa debe tener al menos 1 carácter."
      }).max(100, {
         message: "El nombre de la empresa no debe superar 100 caracteres."
      }).transform((val) => val.trim().toUpperCase()),
      direccion_empresa: z.string().min(1, {
         message: "La dirección de la empresa debe tener al menos 1 carácter."
      }).max(100, {
         message: "La dirección de la empresa no debe superar 100 caracteres."
      }).transform((val) => val.trim().toUpperCase()),
      tipo_de_empresa: z.string().min(1, {
         message: "El tipo de empresa debe tener al menos 1 carácter."
      }).max(100, {
         message: "El tipo de empresa no debe superar 100 caracteres."
      }).transform((val) => val.trim().toUpperCase()),
      telefono_empresa: z.string()
         .regex(/^(?:\+57)?(?:\d{7,10})$/, {
            message: "El teléfono fijo debe tener 7 a 10 dígitos, con o sin prefijo +57."
         })
         .optional()
         .or(z.literal("")), // permite vacío
      ciudad_empresa: z.string().min(1, {
         message: "La ciudad  de la empresa debe tener al menos 1 carácter.",
      }).max(100, {
         message: "La ciudad  de la empresa debe tener como máximo 100 caracteres.",
      }).transform((val) => val.trim().toUpperCase()),
      cargo_conyuge_empresa: z.string().min(1, {
         message: "El cargo del cónyuge en la empresa debe tener al menos 1 carácter."
      }).max(100, {
         message: "El cargo del cónyuge en la empresa no debe superar 100 caracteres."
      }).transform((val) => val.trim().toUpperCase()),
   }),
   z.object({
      tiene_trabajo: z.literal(false),
   })
]);

export const ConyugeSchema = z.object({
   tipo_documento: z.enum(
      tipoDocumento.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione un tipo de documento."
   }),
   numero_documento: z.string().min(6, {
      message: "El número de documento debe tener al menos 6 caracteres.",
   }).max(10, {
      message: "El número de documento debe tener como máximo 10 caracteres.",
   }),
   primer_nombre: z.string().min(1, {
      message: "El primer nombre debe tener al menos 1 carácter."
   }).max(50, {
      message: "El primer nombre no debe superar 50 caracteres."
   }).transform((val) => val.trim().toUpperCase()),
   segundo_nombre: z.string().max(50, {
      message: "El segundo nombre no debe superar 50 caracteres."
   }).transform((val) => val.trim().toUpperCase())
      .optional().or(z.literal("")), // Permite vacío sin marcar error
   primer_apellido: z.string().min(1, {
      message: "El primer apellido debe tener al menos 1 carácter."
   }).max(50, {
      message: "El primer apellido no debe superar 50 caracteres."
   }).transform((val) => val.trim().toUpperCase()),
   segundo_apellido: z.string().max(50, {
      message: "El segundo apellido no debe superar 50 caracteres."
   }).transform((val) => val.trim().toUpperCase())
      .optional().or(z.literal("")), // Permite vacío sin marcar error
   fecha_nacimiento: z.date({ message: "La fecha de nacimiento es requerida." }).max(
      new Date(
         new Date().getFullYear() - 18,
         new Date().getMonth(),
         new Date().getDate()
      ),
      { message: "Debes ser mayor de 18 años." }
   ),
   pais_nacimiento: z.string().min(1, {
      message: "El país de nacimiento debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El país de nacimiento debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase()),
   departamento_nacimiento: z.string().min(1, {
      message: "El departamento de nacimiento debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El departamento de nacimiento debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase()),
   ciudad_nacimiento: z.string().min(1, {
      message: "La ciudad de nacimiento debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La ciudad de nacimiento debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase()),
   barrio_residencia: z.string().min(1, {
      message: "El barrio de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El barrio de residencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase()),
   direccion_residencia: z.string().min(1, {
      message: "La dirección de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La dirección de residencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase()),
   ciudad_residencia: z.string().min(1, {
      message: "La ciudad de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La ciudad de residencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase()),
   departamento_residencia: z.string().min(1, {
      message: "El departamento de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El departamento de residencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase()),
   celular: z.string().min(10, {
      message: "El celular debe tener minimo 10 carácteres."
   }).max(10, {
      message: "El celular no debe superar 10 caracteres."
   }),
   correo: z.email({
      message: "Correo electrónico inválido. @correo.com"
   }).min(1, {
      message: "El correo debe tener al menos 1 carácter."
   }).max(100, {
      message: "El correo no debe superar 100 caracteres."
   }).transform((val) => val.trim().toLowerCase()),
   telefono: z.string()
      .regex(/^(?:\+57)?(?:\d{7,10})$/, {
         message: "El teléfono fijo debe tener 7 a 10 dígitos, con o sin prefijo +57."
      })
      .optional()
      .or(z.literal("")), // permite vacío
   numero_documento_postulante: z.string().min(6, {
      message: "El número de documento debe tener al menos 6 caracteres.",
   }).max(10, {
      message: "El número de documento debe tener como máximo 10 caracteres.",
   }),
}).and(tieneTrabajoSchema);

export type ConyugeSchemaType = z.infer<typeof ConyugeSchema>;