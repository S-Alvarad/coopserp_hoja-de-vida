import { Hero } from '@/components/hero';
import { ModeSwitcher } from '@/components/mode-switcher'

export default function Home() {
   return (
      <>
         <div className="fixed top-6 right-6 z-50">
            <ModeSwitcher />
         </div>
         <div className="flex justify-center items-center flex-col px-6">
            <Hero
               badge={{
                  text: "🌲 Conose mas de nosotros",
                  url: "https://www.coopserp.com/wp1/la-empresa/",
               }}
               heading="Construye tu futuro con Coopserp"
               description="Postúlate a nuestras vacantes y sé parte de un equipo comprometido con el crecimiento y la excelencia. Comparte tu hoja de vida y da el primer paso hacia nuevas oportunidades profesionales."
               buttons={{
                  primary: {
                     text: "Postularme ahora",
                     url: "http://localhost:3000/postulante",
                  },
               }}
               image={{
                  src: "https://i.pinimg.com/736x/d0/de/9a/d0de9aa6612b61e627d95f9282cd89db.jpg",
                  alt: "Imagen ilustrativa de oportunidades laborales en Coopserp",
               }}
            />
         </div>
      </>
   );
}

