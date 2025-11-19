import { useState } from "react";

interface AutocompleteProps {
  items: { id: number; name: string }[];
  value: string;
  onChange: (value: string) => void;
  placeHolder?: string;
}

const AutocompleteSingleSelect = ({
  items,
  value,
  onChange,
  placeHolder = "انتخاب چالش",
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredItems, setFilteredItems] = useState(items);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredItems(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (name: string) => {
    setInputValue(name);
    onChange(name);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <input
        dir="rtl"
        type="text"
        className="
                w-full 
                border 
                !border-[var(--borderDefault)] 
                shadow-[0px_1px_0px_var(--borderDefault)] 
                focus:!border-[var(--borderFoucus)] 
                focus:!shadow-[0px_1px_0px_var(--borderFoucusShadow)] 
                focus:!ring-0 focus-visible:!ring-0
                rounded-xl 
                h-10 
                p-2 
                text-right
                transition-all duration-200 ease-in-out
                placeholder:text-gray-500
                placeholder:text-sm
                placeholder:font-bold
              "
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        placeholder={placeHolder}
      />
      {showDropdown && filteredItems.length > 0 && (
        <div className="absolute z-10 w-full bg-white border-2 border-gray-300 rounded-xl mt-1 max-h-40 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              dir="rtl"
              key={item.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSingleSelect;
