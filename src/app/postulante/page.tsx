import { ModeSwitcher } from '@/components/mode-switcher'
import { PostulanteForm } from "@/components/postulante/postulante-form"

export default function PostulantePage() {
   return (
      <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
         <div className="fixed top-6 right-6">
            <ModeSwitcher />
         </div>
         <div className="flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-col gap-6 mx-auto p-2">
            <PostulanteForm />
         </div>
      </div>
   )
}
