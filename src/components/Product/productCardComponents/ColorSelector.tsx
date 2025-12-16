import React from "react";
import type { ColorSelectorProps } from "@/types/productCardTypes";


const ColorSelector: React.FC<ColorSelectorProps> = ({ product }) => {
    return (
        <div className="flex gap-2 flex-wrap">
            {product.colors.map(color => (
                <button
                    key={color.hex}
                    className="w-4 aspect-square rounded-full border border-border"
                    style={{ backgroundColor: color.hex }}
                />
            ))}
        </div>
    );
};


export default ColorSelector;
