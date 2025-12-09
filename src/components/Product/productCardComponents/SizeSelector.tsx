import React from "react";
import type { SizeSelectorProps } from "@/types/productCardTypes";


const SizeSelector: React.FC<SizeSelectorProps> = ({ product }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
                <button
                    key={size.label}
                    className="border border-border bg-background text-foreground px-3 py-1 text-xs rounded-lg transition whitespace-nowrap"
                >
                    {size.label}
                </button>
            ))}
        </div>
    );
};


export default SizeSelector;