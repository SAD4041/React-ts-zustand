import React from 'react';
import CustomInput from '@/components/Custom/CustomInput';
import {Search} from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange, onBlur }) => {
  return (
    <div className="flex justify-center mb-3">
      <CustomInput
        className=" w-88 h-8 sm:w-100 sm:h-8 md:w-110 md:h-9 rounded-[12.5px]"
        name="searchTerm"
        label=""
        icon= {<Search/>}
        value={searchTerm}
        onChange={onSearchTermChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchBar;
