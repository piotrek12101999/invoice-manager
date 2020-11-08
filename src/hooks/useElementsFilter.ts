import { useState, Dispatch, SetStateAction } from 'react';
import { omit } from '../utils/omit';

interface UseElementsFilterDetails<T> {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  filterElements: () => T[];
}

function useElementsFilter<T>(elements: T[], propertiesToOmit: string[] = []): UseElementsFilterDetails<T> {
  const [value, setValue] = useState('');

  const filterElements = (): T[] => {
    if (!value) {
      return elements;
    }

    return elements.filter((element) =>
      Object.values(omit(element, propertiesToOmit)).some((property) => property.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return { value, setValue, filterElements };
}

export default useElementsFilter;
