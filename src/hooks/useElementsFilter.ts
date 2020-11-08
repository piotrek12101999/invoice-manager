import { useState, Dispatch, SetStateAction, useCallback } from 'react';
import dayjs from 'dayjs';
import { omit } from '../utils/omit';

interface UseElementsFilterDetails<T> {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  filterElements: () => T[];
}

function useElementsFilter<T>(elements: T[], propertiesToOmit: string[] = []): UseElementsFilterDetails<T> {
  const [value, setValue] = useState('');

  const filterElements = useCallback((): T[] => {
    if (!value) {
      return elements;
    }
    return elements.filter((element) =>
      Object.values(omit(element, propertiesToOmit)).some((property) => {
        if (typeof property === 'object') {
          return dayjs(property).format('D MMM, YYYY').toLowerCase().includes(value.toLowerCase());
        }

        return `${property}`.toLowerCase().includes(value.toLowerCase());
      })
    );
  }, [value, elements, propertiesToOmit]);

  return { value, setValue, filterElements };
}

export default useElementsFilter;
