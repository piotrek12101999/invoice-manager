import { useState } from 'react';

interface ListViewDetails {
  isListView: boolean;
  handleListViewSelect: (isListViewSelected: boolean) => () => void;
}

function useListView(name: string): ListViewDetails {
  const [isListView, setListView] = useState(localStorage.getItem(name) === 'list');

  const handleListViewSelect = (isListViewSelected: boolean) => () => {
    localStorage.setItem(name, isListViewSelected ? 'list' : 'grid');
    setListView(isListViewSelected);
  };

  return { isListView, handleListViewSelect };
}

export default useListView;
