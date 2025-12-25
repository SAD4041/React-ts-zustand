"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Extend props: all shadcn Button props + motion props
type MotionButtonProps = ButtonProps & React.ComponentProps<typeof motion.button>

export function MotionButton({ className, children, ...props }: MotionButtonProps) {
    return (
        <Button
            asChild
            className={cn("cursor-pointer", className)}
            {...props}
        >
            <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {children}
            </motion.button>
        </Button>
    )
}
