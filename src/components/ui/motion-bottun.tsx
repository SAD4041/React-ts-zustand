"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Extend props: all Button props + motion props on the same element (no nested buttons)
type MotionButtonProps = ButtonProps & React.ComponentProps<typeof motion.button>

const MotionButtonBase = motion.create(Button)

export function MotionButton({ className, children, ...props }: MotionButtonProps) {
    return (
        <MotionButtonBase
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn("cursor-pointer", className)}
            {...props}
        >
            {children}
        </MotionButtonBase>
    )
}
