import * as React from "react"

import { cn } from "@/utils/style"
import { Button } from "./button"
import { Minus, Plus } from "lucide-react"
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { equalsIgnoreCase, toFirstUpperCase } from "@/utils/general";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const NumberInput = React.forwardRef<HTMLInputElement, InputProps & {
  onChange?: (value: number) => void
}>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="number"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
          className
        )}
        ref={ref}
        {...props}
        onChange={(e) => props.onChange && props.onChange(Number(e.target.value))}
      />
    )
  }
);
NumberInput.displayName = "NumberInput";

const ButtonNumberInput = React.forwardRef<HTMLInputElement, InputProps & {
  onChange?: (value: number) => void
}>(
  ({ className, ...props }, ref) => {
    return (
      <>
        <div className="flex flex-row gap-2">
          <Button type="button" variant="outline" className="rounded-full p-3 h-auto" onClick={() => props.onChange && props.onChange((props.value as number) - 1)}>
            <Minus className="w-4 h-4" />
          </Button>

          <div className="flex-n-center w-8">{props.value}</div>

          <Button type="button" variant="outline" className="rounded-full p-3 h-auto" onClick={() => props.onChange && props.onChange((props.value as number) + 1)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <input
          type="hidden"
          ref={ref}
          {...props}
        />
      </>
      // <input
      //   type="number"
      //   className={cn(
      //     "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
      //     className
      //   )}
      //   ref={ref}
      //   {...props}
      //   onChange={(e) => props.onChange && props.onChange(Number(e.target.value))}
      // />
    )
  }
);
ButtonNumberInput.displayName = "ButtonNumberInput";

type CityInputProps = InputProps & {
  name: string;
  onChange: (value: number) => void;
  cities: { label: string; value: string }[];
  placeholder?: string;
}

const CityInput = React.forwardRef<HTMLInputElement, CityInputProps>(
  ({ className, type, cities, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const selectedCity = React.useMemo(() => {
      const _selectedCity = cities.find((c) => equalsIgnoreCase(c.value, props.value));

      return {
        label: _selectedCity?.label || "",
        value: _selectedCity?.value || -1
      };
    }, [props.value])

    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn('w-64 justify-between', className)}
            >
              <span>{selectedCity.value === -1 ? props.placeholder ?? 'Select a city...' : toFirstUpperCase(selectedCity.label)}</span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search city..." />
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup className="max-h-44 overflow-y-scroll">
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.label}
                    onSelect={(currentValue) => {
                      const _selectedCity = cities.find((c) => equalsIgnoreCase(c.label, currentValue));
                      props.onChange(Number(_selectedCity?.value || -1));
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        equalsIgnoreCase(selectedCity.value, city.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {toFirstUpperCase(city.label)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <input
          type="hidden"
          ref={ref}
          {...props}
        />
      </>
    )
  }
);
CityInput.displayName = "CityInput";

export { Input, NumberInput, ButtonNumberInput, CityInput }