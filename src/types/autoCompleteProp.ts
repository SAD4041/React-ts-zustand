export interface AutocompleteProps {
  items: { id: number; name: string }[];
  value: string;
  onChange: (value: { id: number; name: string }) => void;
  placeHolder?: string;
}