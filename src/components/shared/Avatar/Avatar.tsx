import React from 'react';
import styled from 'styled-components';

interface Props {
  size: 'extraSmall' | 'small' | 'medium' | 'large';
  invertedColors?: boolean;
}

const sizesLookUpTable = {
  extraSmall: {
    elementSize: '35px',
    fontSize: '14px'
  },
  small: {
    elementSize: '40px',
    fontSize: '16px'
  },
  medium: {
    elementSize: '80px',
    fontSize: '32px'
  },
  large: {
    elementSize: '140px',
    fontSize: '52.5px'
  }
};

const StyledContainer = styled.div<Props>`
  width: ${(props) => sizesLookUpTable[props.size].elementSize};
  height: ${(props) => sizesLookUpTable[props.size].elementSize};
  font-size: ${(props) => sizesLookUpTable[props.size].fontSize};
  border-radius: 50%;
  background: ${(props) => (props.invertedColors ? props.theme.elementsColor : props.theme.canvasColor)};
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ComponentProps extends Props {
  className?: string;
  text: string;
}

const Avatar: React.FC<ComponentProps> = ({ size, className, text, invertedColors }) => {
  const [firstWord, secondWord] = text.split(' ');

  const renderText = (): string => {
    if (!secondWord) {
      return firstWord.substring(0, 2).toUpperCase();
    }

    return `${firstWord.charAt(0)}${secondWord.charAt(0)}`.toUpperCase();
  };

  return (
    <StyledContainer className={className} size={size} invertedColors={invertedColors}>
      {renderText()}
    </StyledContainer>
  );
};

export default Avatar;
