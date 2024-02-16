import * as React from "react"

import { cn } from "@/utils/style"
import { Button } from "./button"
import { Minus, Plus } from "lucide-react"

import { equalsIgnoreCase } from "@/utils/general";
import { AutoComplete } from "../autocomplete";
import DatePicker from "../date-picker";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
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
        type="text"
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
          className
        )}
        ref={ref}
        {...props}
        onChange={(e) => {
          if (!props.onChange) return;
          if (e.target.value === "") return props.onChange(0);
          const value = Number(e.target.value.replace(/\D/g, ""));
          props.onChange(Math.max(0, value));
        }}
        value={props.value === 0 ? "" : props.value}
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
    const selectedCity = React.useMemo(() => {
      const _selectedCity = cities.find((c) => equalsIgnoreCase(c.value, props.value));

      return {
        label: _selectedCity?.label || "",
        value: String(_selectedCity?.value || -1)
      };
    }, [props.value])

    return (
      <>
        <AutoComplete
          options={cities}
          emptyMessage="Select a city..."
          placeholder="Select a city..."
          onValueChange={(currentValue) => {
            const _selectedCity = cities.find((c) => equalsIgnoreCase(c.label, currentValue.label));
            props.onChange(Number(_selectedCity?.value || -1));
          }}
          value={selectedCity}
          className={cn('h-8 py-0', className)}
        />
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

type DateInputProps = Omit<InputProps, 'onChange' | 'value'> & {
  onChange: (value: string | undefined) => void;
  value: string | undefined;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, type, onChange, ...props }, ref) => {
    return (
      <>
        <DatePicker
          onChange={(date) => {
            if (date === undefined) return;
            onChange(date)
          }}
          value={props.value}
          className={className}
        />
        <input
          type="hidden"
          ref={ref}
          {...props}
        />
      </>
    )
  }
);
DateInput.displayName = "DateInput";

export { Input, NumberInput, ButtonNumberInput, CityInput, DateInput }