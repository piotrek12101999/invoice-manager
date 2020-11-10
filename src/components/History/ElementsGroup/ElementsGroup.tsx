import React from 'react';
import dayjs from 'dayjs';
import { HistoryElement } from '../groupElements';
import Element from './Element/Element';

interface Props {
  groupName: string;
  elements: HistoryElement[];
}

const ElementsGroup: React.FC<Props> = ({ groupName, elements }) => {
  return (
    <>
      <p className="invoice-month">{dayjs(groupName.length === 6 ? `0${groupName}` : groupName, 'MM-YYYY').format('MMMM YYYY')}</p>
      <div className="elements-grid">
        {elements.map((element, index) => (
          <Element key={index} element={element} />
        ))}
      </div>
    </>
  );
};

export default ElementsGroup;
