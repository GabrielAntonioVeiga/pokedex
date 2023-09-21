import styled from 'styled-components'
import { devices } from '../../assets/styles/global'

export const ContainerStyledSelect = styled.div``

export const Container = styled.div`
  background-color: #b388eb;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  width: 100%;
  top: 0;

  @media (${devices.mobile}) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 3rem 0;
    gap: 1rem;

    /* ${ContainerStyledSelect} {
      order: 1;
    } */
  }
`

export const ContainerStyledSearchBar = styled.div`
  flex: 0.6;
`

export const StyledSearchbar = styled.input`
  width: 10rem;
  height: 5vh;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 3px solid transparent;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  appearance: none;
  border-radius: 7px;
  width: 100%;

  :focus {
    border: 3px solid #627;
  }

  ::placeholder {
    position: absolute;
    left: 10px;
  }
`
export const ContainerArrows = styled.div`
  button {
    cursor: pointer;
    background: none;
    border: none;
  }
`

export const StyledButton = styled.button`
  background-color: #f7aef8;
  border: none;
  border-radius: 7px;
  height: 3.5vh;
  width: 3.5rem;
  cursor: pointer;
  position: block;
`
export const ContainerFavorites = styled.div`
  margin-bottom: 20px;

  div {
    display: flex;
    justify-content: center;
  }

  img {
    cursor: pointer;
    background: none;
    border: none;
  }
`
