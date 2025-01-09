import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FilterDiv from './filterDiv';
import SearchDiv from './searchDiv';
import { Link } from 'react-router-dom';

function WriteFilterSearchAddToggle() {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleFilterClick = () => {
    if (isSearchVisible) setIsSearchVisible(false);
    setFilterModalOpen(!isFilterModalOpen);
  };

  const handleSearchClick = () => {
    if (isFilterModalOpen) setFilterModalOpen(false);
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      {isSearchVisible && (
        <div className="fixed bottom-20 right-20 bg-white p-4 rounded-lg shadow-lg z-40">
          <SearchDiv />
        </div>
      )}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
        <button 
          onClick={handleFilterClick}
          className={`w-12 h-12 rounded-full ${isFilterModalOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
        >
          {isFilterModalOpen ? <CloseIcon /> : <FilterListIcon />}
        </button>
        <button 
          onClick={handleSearchClick}
          className={`w-12 h-12 rounded-full ${isSearchVisible ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
        >
          {isSearchVisible ? <CloseIcon /> : <SearchIcon />}
        </button>
        <Link to="add-wp">
          <button className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <AddIcon />
          </button>
        </Link>
      </div>
      <FilterDiv 
        isFilterModalOpen={isFilterModalOpen}
        setFilterModalOpen={setFilterModalOpen}
      />
    </>
  );
}

export default WriteFilterSearchAddToggle;