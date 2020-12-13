import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Switch } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  title: string;
  summaryClassName: string;
  expanded: boolean;
  togglePanel: () => void;
}

const Line = styled.div`
  background-color: ${(props) => props.theme.canvasColor};
  height: 2px;
  margin-bottom: 10px;
`;

const SettingsModule: React.FC<Props> = ({ children, title, expanded, summaryClassName, togglePanel }) => {
  return (
    <Accordion expanded={expanded} classes={{ root: 'expansion-panel' }}>
      <AccordionSummary className="summary">
        <div className="heading">
          <p className="title">{title}</p>
          <Switch color="primary" checked={expanded} onClick={togglePanel} />
        </div>
      </AccordionSummary>
      <AccordionDetails className="details">
        <Line />
        <div className={`${summaryClassName} details-content`}>{children}</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default SettingsModule;
