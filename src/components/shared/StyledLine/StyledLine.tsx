import styled from 'styled-components';

const StyledLine = styled.div<{ height?: number }>`
  height: ${({ height }) => height || 2}px;
  width: 100%;
  margin-bottom: 30px;
  background-color: ${(props) => props.theme.canvasColor};
`;

export default StyledLine;
