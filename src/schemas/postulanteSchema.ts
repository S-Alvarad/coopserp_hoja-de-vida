import { z } from "zod"
import { tipoDocumento } from '@/constants/tipoDocumento'
import { sexo } from '@/constants/sexo'
import { tipoSangre } from '@/constants/tipoSangre'
import { estadoCivil } from '@/constants/estadoCivil'

// 1. Definimos un esquema tipado con Zod
const tieneHijosSchema = z.discriminatedUnion("tiene_hijos", [
   z.object({
      tiene_hijos: z.literal(false),
   }),
   z.object({
      tiene_hijos: z.literal(true),
      numero_hijos: z.number({
         message: "Este campo debe ser mayor que 0."
      }).int().nonnegative("No puede ser negativo").min(1, "Debe tener al menos 1 hijo.")
   })
]);

export const PostulanteSchema = z.object({
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
   barrio_correspondencia: z.string().min(1, {
      message: "El barrio de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El barrio de correspondencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase())
      .optional().or(z.literal("")), // Permite vacío sin marcar error
   direccion_correspondencia: z.string().min(1, {
      message: "La dirección de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La dirección de correspondencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase())
      .optional().or(z.literal("")), // Permite vacío sin marcar error
   ciudad_correspondencia: z.string().min(1, {
      message: "La ciudad de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La ciudad de correspondencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase())
      .optional().or(z.literal("")), // Permite vacío sin marcar error
   departamento_correspondencia: z.string().min(1, {
      message: "El departamento de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El departamento de correspondencia debe tener como máximo 100 caracteres.",
   }).transform((val) => val.trim().toUpperCase())
      .optional().or(z.literal("")), // Permite vacío sin marcar error
   sexo: z.enum(
      sexo.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione su sexo."
   }),
   tipo_sangre: z.enum(
      tipoSangre.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione su tipo de sangre."
   }),
   estado_civil: z.enum(
      estadoCivil.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione su estado civil."
   }),
   personas_a_cargo: z.string().min(1, {
      message: "Este campo es obligatorio y debe tener al menos 1 carácter."
   }).max(10, {
      message: "Este campo debe tener como máximo 10 caracteres."
   }),
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
}).and(tieneHijosSchema);

// 2. Inferimos el tipo de datos
export type PostulanteSchemaType = z.infer<typeof PostulanteSchema>;

// 3. Configuramos React Hook Form con Zod
// src/hooks/usePostulanteForm.ts