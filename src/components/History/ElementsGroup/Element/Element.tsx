import { CircularProgress } from '@material-ui/core';
import React from 'react';
import StyledElementContainer from '../../../shared/StyledElementContainer/StyledElementContainer';
import { HistoryElement } from '../../groupElements';
import Expense from './types/Expense';
import Invoice from './types/Invoice';

interface Props {
  element: HistoryElement;
}

const Element: React.FC<Props> = ({ element }) => {
  const pdfIsNotGenerated = element.type === 'invoice' && !element.isGeneratedPDF;

  return (
    <StyledElementContainer className={`element ${pdfIsNotGenerated && 'disabled'}`}>
      {element.type === 'expense' ? <Expense data={element} /> : <Invoice data={element} />}
      {pdfIsNotGenerated && (
        <div className="overlay">
          <CircularProgress size={60} />
        </div>
      )}
    </StyledElementContainer>
  );
};

export default Element;
