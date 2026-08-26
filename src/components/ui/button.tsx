import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-forest-deep shadow-soft",
        ember: "bg-ember text-white hover:bg-ember-deep shadow-soft",
        whatsapp: "bg-[#1da851] text-white hover:bg-[#179144] shadow-soft",
        secondary: "bg-cream text-ink hover:bg-sand border border-line",
        outline: "border border-line bg-transparent hover:bg-cream text-ink",
        ghost: "hover:bg-cream text-ink",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-soft",
        glass: "glass text-ink hover:bg-white/70",
      },
      size: {
        default: "h-11 px-6 text-sm rounded-full",
        sm: "h-9 px-4 text-[13px] rounded-full",
        lg: "h-13 px-8 text-base rounded-full",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
