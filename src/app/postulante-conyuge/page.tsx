'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog" // Ajusta la importación según tu setup de UI (ej. Shadcn UI).
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RedirectPostulanteConyugePage() {
   const [cedula, setCedula] = useState('');
   const [open, setOpen] = useState(true); // Abre el diálogo automáticamente al cargar la página.
   const router = useRouter();

   const handleSubmit = () => {
      if (cedula.trim()) {
         router.push(`/postulante-conyuge/${cedula}`);
         setOpen(false);
      } else {
         // Opcional: Maneja error si el campo está vacío, como mostrar un toast.
         alert('Por favor, ingresa una cédula válida.');
      }
   };

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Ingrese la cédula</AlertDialogTitle>
               <AlertDialogDescription>
                  Por favor, proporcione la cédula del postulado para continuar.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
               type="text"
               placeholder="Cédula"
               value={cedula}
               onChange={(e) => setCedula(e.target.value)}
               className="mt-4"
            />
            <AlertDialogFooter className="mt-4">
               <Button onClick={handleSubmit}>Enviar</Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}