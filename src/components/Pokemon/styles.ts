import { AiTwotoneHeart } from 'react-icons/ai'

import styled, { css } from 'styled-components'

type ContainerProps = {
  type?:
    | 'grass'
    | 'fire'
    | 'water'
    | 'electric'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy'
    | 'shadow'
    | 'unknown'
    | 'normal'
}

const containerVariants = {
  normal: css`
    background: ${({ theme }) => theme.colors.card.normal};
  `,
  grass: css`
    background: ${({ theme }) => theme.colors.card.grass};
  `,
  fire: css`
    background: ${({ theme }) => theme.colors.card.fire};
  `,
  water: css`
    background: ${({ theme }) => theme.colors.card.water};
  `,
  electric: css`
    background: ${({ theme }) => theme.colors.card.electric};
  `,
  ice: css`
    background: ${({ theme }) => theme.colors.card.ice};
  `,
  fighting: css`
    background: ${({ theme }) => theme.colors.card.fighting};
  `,
  poison: css`
    background: ${({ theme }) => theme.colors.card.poison};
  `,
  ground: css`
    background: ${({ theme }) => theme.colors.card.ground};
  `,
  flying: css`
    background: ${({ theme }) => theme.colors.card.flying};
  `,
  psychic: css`
    background: ${({ theme }) => theme.colors.card.psychic};
  `,
  bug: css`
    background: ${({ theme }) => theme.colors.card.bug};
  `,
  rock: css`
    background: ${({ theme }) => theme.colors.card.rock};
  `,
  ghost: css`
    background: ${({ theme }) => theme.colors.card.ghost};
  `,
  dragon: css`
    background: ${({ theme }) => theme.colors.card.dragon};
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.card.dark};
  `,
  steel: css`
    background: ${({ theme }) => theme.colors.card.steel};
  `,
  fairy: css`
    background: ${({ theme }) => theme.colors.card.fairy};
  `,
  shadow: css`
    background: ${({ theme }) => theme.colors.card.shadow};
  `,
  unknown: css`
    background: ${({ theme }) => theme.colors.card.unknown};
  `
}

export const Card = styled.div`
  /* width: 250px; */
  height: 96px;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  /* align-items: center; */

  //teste
  /* position: relative; */

  img {
    cursor: pointer;
    //pointer-events: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .favorite-pokemon {
    margin-left: 8px;
    display: flex;
    justify-content: center;
    /* align-items: center; */

    //teste
    /* position: absolute; */
    /* right: 4%; */
    /* top: 40%; */

    button {
      /* cursor: pointer; */
      border: none;
      background: none;
      color: none;
    }
  }

  .pokemon-info {
    margin-left: 8px;
    //teste
    width: 50%;
  }

  //display the types in the below of the card
  .pokemon-types {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }
`

export const HeartIcon = styled(AiTwotoneHeart)`
  cursor: pointer;
`

export const ContainerTypePokemon = styled.div<ContainerProps>`
  margin-right: 8px;
  padding: 3px;
  border: 1px solid none;
  border-radius: 5px;

  ${({ type }) => containerVariants[type || 'unknown']};
`
