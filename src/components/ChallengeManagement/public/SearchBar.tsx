// src/components/Custom/SearchBar.tsx
import React from 'react';
import { Field, Form, Formik } from 'formik';
import CustomInput from '@/components/Custom/CustomInput';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <Formik initialValues={{ searchTerm }} onSubmit={() => {}}>
      {({ values, handleChange, handleBlur }) => (
        <div className="w-full max-w-xl mx-auto">
          <Form className="w-full">
            <Field
              name="searchTerm"
              render={({ field }: any) => (
                <CustomInput
                  {...field}
                  icon={<Search className="w-5 h-5 text-gray-500" />}
                  value={values.searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    onSearchTermChange(e.target.value);
                  }}
                  onBlur={handleBlur}
                  label='جست و جو'
                  width="w-full"
                  className="rounded-[8px]"
                />
              )}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SearchBar;