import { useContext } from 'react'
import { PokemonContext } from '../../contexts/PokemonsContext'
import { StyledTitle } from './styles'

export function Title() {
  const { resetPokemons } = useContext(PokemonContext)

  return (
    <>
      <StyledTitle>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Pokedex logo"
          height={60}
          width={180}
          onClick={resetPokemons}
        />
      </StyledTitle>
    </>
  )
}
