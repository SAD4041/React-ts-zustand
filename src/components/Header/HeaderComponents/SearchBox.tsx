import { useState } from 'react';
import searchIcon from '@/assets/search.png';

const SearchBox = () => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('has been searched', query);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="relative ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جست و جو محصولات"
        dir='rtl'
        className="bg-white rounded-full px-4 py-2 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 w-60 md:w-48 md:text-sm lg:w-90"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
      >
        <img src={searchIcon} alt="ذره‌بین" className="h-4 w-4" />
      </button>
    </form>
  );
};

export default SearchBox;