export type CustomSelectProps = {
    label?: string;
    name: string;
    options: { value: string; label: string }[];
    icon?: React.ReactNode;
    onIconClick?: () => void;
    width?: string;
  };