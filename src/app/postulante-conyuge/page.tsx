import { ModeSwitcher } from '@/components/mode-switcher'
import { PostulanteConyugeForm } from "@/components/postulante-conyuge/postulante-conyuge-form"

export default function PostulanteConyuge() {
   return (
      <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 lg:p-6 md:p-10">
         <div className="fixed top-3 right-3 lg:top-6 lg:right-6">
            <ModeSwitcher />
         </div>
         <div className="flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-col gap-6 mx-auto lg:p-2">
            <PostulanteConyugeForm />
         </div>
      </div>
   )
}