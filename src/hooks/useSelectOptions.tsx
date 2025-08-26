import { useMemo } from "react";
import { SelectItem } from "@/components/ui/select";

type Option = {
   value: string;
   label: string;
};

export const useSelectOptions = (options: Option[]) => {
   return useMemo(() => {
      if (!options || options.length === 0) {
         return (
            <SelectItem value="no-options" disabled>
               No hay opciones disponibles
            </SelectItem>
         );
      }

      return options.map((option) => (
         <SelectItem key={option.value} value={option.value}>
            {option.label}
         </SelectItem>
      ));
   }, [options]);
};
