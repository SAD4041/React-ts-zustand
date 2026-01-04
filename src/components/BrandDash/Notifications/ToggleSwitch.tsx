interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({ checked, onChange }: Props) {
  return (
    <button
      onClick={onChange}
      className={`
        relative
        box-border
        h-6
        w-11
        rounded-full
        transition-colors
        duration-200
        ${checked ? "bg-cyan-500" : "bg-white border border-[#C0C0C0]"}
      `}
    >
      <span
        className={`
          absolute
          top-1/2
          left-0.75
          h-4.5
          w-4.5
          -translate-y-1/2
          rounded-full
          bg-[#D9D9D9]
          transition-transform
          duration-200
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}
