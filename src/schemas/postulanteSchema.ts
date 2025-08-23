import { z } from "zod"
import { tipoDocumento } from '@/constants/tipoDocumento'
import { sexo } from '@/constants/sexo'
import { tipoSangre } from '@/constants/tipoSangre'
import { estadoCivil } from '@/constants/estadoCivil'

const tieneHijosSchema = z.discriminatedUnion("tiene_hijos", [
   z.object({
      tiene_hijos: z.literal(true),
      numero_hijos: z.number({
         message: "Este campo es obligatorio."
      }).refine(val => !isNaN(val) && val > 0, {
         message: "Este campo es obligatorio y mayor a 0.",
      }),
   }),
   z.object({
      tiene_hijos: z.literal(false),
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
   }),
   segundo_nombre: z.string().max(50, {
      message: "El segundo nombre no debe superar 50 caracteres."
   }).optional().or(z.literal("")), // Permite vacío sin marcar error
   primer_apellido: z.string().min(1, {
      message: "El primer apellido debe tener al menos 1 carácter."
   }).max(50, {
      message: "El primer apellido no debe superar 50 caracteres."
   }),
   segundo_apellido: z.string().max(50, {
      message: "El segundo apellido no debe superar 50 caracteres."
   }).optional().or(z.literal("")), // Permite vacío sin marcar error
   fecha_nacimiento: z.date({
      message: "La fecha de nacimiento es requerida.",
   }),
   pais_nacimiento: z.string().min(1, {
      message: "El país de nacimiento debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El país de nacimiento debe tener como máximo 100 caracteres.",
   }),
   departamento_nacimiento: z.string().min(1, {
      message: "El departamento de nacimiento debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El departamento de nacimiento debe tener como máximo 100 caracteres.",
   }),
   ciudad_nacimiento: z.string().min(1, {
      message: "La ciudad de nacimiento debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La ciudad de nacimiento debe tener como máximo 100 caracteres.",
   }),
   barrio_residencia: z.string().min(1, {
      message: "El barrio de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El barrio de residencia debe tener como máximo 100 caracteres.",
   }),
   direccion_residencia: z.string().min(1, {
      message: "La dirección de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La dirección de residencia debe tener como máximo 100 caracteres.",
   }),
   ciudad_residencia: z.string().min(1, {
      message: "La ciudad de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La ciudad de residencia debe tener como máximo 100 caracteres.",
   }),
   departamento_residencia: z.string().min(1, {
      message: "El departamento de residencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El departamento de residencia debe tener como máximo 100 caracteres.",
   }),
   barrio_correspondencia: z.string().min(1, {
      message: "El barrio de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El barrio de correspondencia debe tener como máximo 100 caracteres.",
   }).optional().or(z.literal("")), // Permite vacío sin marcar error
   direccion_correspondencia: z.string().min(1, {
      message: "La dirección de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La dirección de correspondencia debe tener como máximo 100 caracteres.",
   }).optional().or(z.literal("")), // Permite vacío sin marcar error
   ciudad_correspondencia: z.string().min(1, {
      message: "La ciudad de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "La ciudad de correspondencia debe tener como máximo 100 caracteres.",
   }).optional().or(z.literal("")), // Permite vacío sin marcar error
   departamento_correspondencia: z.string().min(1, {
      message: "El departamento de correspondencia debe tener al menos 1 carácter.",
   }).max(100, {
      message: "El departamento de correspondencia debe tener como máximo 100 caracteres.",
   }).optional().or(z.literal("")), // Permite vacío sin marcar error
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
   personas_a_cargo: z.number().min(1, {
      message: "El número de personas a cargo debe ser al menos 1.",
   }).max(100, {
      message: "El número de personas a cargo debe ser como máximo 100.",
   }),
   celular: z.string().min(1, {
      message: "El celular debe tener al menos 1 carácter."
   }).max(10, {
      message: "El celular no debe superar 10 caracteres."
   }),
   correo: z.email().min(1, {
      message: "El correo debe tener al menos 1 carácter."
   }).max(100, {
      message: "El correo no debe superar 100 caracteres."
   }),
   telefono: z.string().min(1, {
      message: "El teléfono debe tener al menos 1 carácter."
   }).max(15, {
      message: "El teléfono no debe superar 15 caracteres."
   }).optional().or(z.literal("")), // Permite vacío sin marcar error
}).and(tieneHijosSchema);

export type PostulanteSchemaType = z.infer<typeof PostulanteSchema>;