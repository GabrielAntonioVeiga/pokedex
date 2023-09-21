import { useContext, useEffect } from 'react'
import { PokemonContext } from '../../contexts/PokemonsContext'
import Pokemon from '../Pokemon'
import { Container } from './styles'

//debounce, triggle
// Cada search dar um delay de 3 segundos
export function PokemonDisplay() {
  const { getPokemons, category, page, loading, pokemons, indexInicial, indexFinal, indexPokemon } =
    useContext(PokemonContext)

  useEffect(() => {
    getPokemons()
  }, [page, category, indexPokemon])

  return (
    <>
      <Container loading={loading ? 1 : 0}>
        {
          // !loading &&
          pokemons.slice(indexInicial, indexFinal).map(
            (
              pokemon: {
                id: number
                name: string
                types: any
                sprites: { front_default: string }
              },
              index: number
            ) => (
              <Pokemon key={index} pokemon={pokemon} />
            )
          )
        }
      </Container>
    </>
  )
}
