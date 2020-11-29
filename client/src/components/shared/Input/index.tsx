import styled from 'styled-components';

const Input = styled.input`
  font-size: 1rem;
  padding: 0.8em;
  border-radius: 0.5em;
  appearance: none;
  background-color: #ebf4ff;
  border-width: 2px;
  border-color: #ebf4ff;
  border-style: solid;
  line-height: 1.25;
  box-shadow: none;
  outline: none;
  &:focus {
    border-color: #7f9cf5;
  }
`;

export default Input;
