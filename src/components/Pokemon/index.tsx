// import { StyledButton } from '../NavBar/styles'
import { useContext, useEffect } from 'react'
import { PokemonContext } from '../../contexts/PokemonsContext'
import { Card, ContainerTypePokemon, HeartIcon } from './styles'

type PokemonProps = {
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

interface PokemonsProperties {
  id: number
  name: string
  types: [
    {
      type: {
        name: string
      }
    }
  ]
  sprites: {
    front_default: string
  }
}

export default function Pokemon(props: { pokemon: PokemonsProperties; type?: PokemonProps }) {
  const {
    updateFavoritePokemons,
    favorites,
    store,
    evolutionChainPokemon,
    setPokemons,
    resetPokemons,
    setLoading,
    setEvo,
    setIndexInicial,
    setIndexFinal
  } = useContext(PokemonContext)

  useEffect(store, [favorites])

  async function getPokemonURL(url: string) {
    const response = await fetch(url)
    return response.json()
  }

  const getEvoluitonChain = async () => {
    try {
      setEvo(true)
      // setPokemonEvolution(props.pokemon.name)
      // setCategory('')
      // setSearchValue('')
      // setPage(0)
      // getPokemons()
      setLoading(true)
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${props.pokemon.name}/`
      )
      if (response.status >= 400 && response.status <= 500) {
        // alert('Nao existe evolucao para este Pokemon!')
        resetPokemons()
        return
      }
      const data = await response.json()
      const evolutionChain = await fetch(data.evolution_chain.url)
      const evolutionChainData = await evolutionChain.json()

      evolutionChainPokemon.push(evolutionChainData.chain.species.name)

      for (let i = 0; i < evolutionChainData.chain.evolves_to.length; i++) {
        evolutionChainPokemon.push(evolutionChainData.chain.evolves_to[i].species.name)
        for (let j = 0; j < evolutionChainData.chain.evolves_to[i].evolves_to.length; j++) {
          evolutionChainPokemon.push(
            evolutionChainData.chain.evolves_to[i].evolves_to[j].species.name
          )
        }
      }

      // evolutionChainPokemon.push(evolutionChainData.chain.evolves_to[0].species.name)
      // evolutionChainPokemon.push(evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name)

      // evolutionChainPokemon.forEach((pokemon) => {
      //   return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      // })

      const pokemonsData = evolutionChainPokemon.map((name) => {
        return getPokemonURL(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      })

      const results = await Promise.all(pokemonsData)
      setIndexInicial(0)
      setIndexFinal(18)

      setPokemons(results)
      setEvo(true)
      // setPage(0)

      evolutionChainPokemon.length = 0
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLoading(false)
      setEvo(false)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <div className="pokemon-img">
          {props.pokemon.sprites.front_default && (
            <img
              src={props.pokemon.sprites.front_default}
              alt={props.pokemon.name}
              height={96}
              width={96}
              draggable={false}
              onClick={getEvoluitonChain}
            />
          )}
          {!props.pokemon.sprites.front_default && (
            <img
              src="data:image/png;base64,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"
              alt={props.pokemon.name}
              height={96}
              width={96}
            />
          )}
        </div>

        <div className="pokemon-info">
          <strong>{props.pokemon.name}</strong>
          <br />
          {/* <StyledButton>EVO</StyledButton> */}
          <div className="pokemon-types">
            {props.pokemon.types.map((type: { type: { name: any } }, index: number) => (
              <ContainerTypePokemon key={index} type={type.type.name}>
                {type.type.name}
              </ContainerTypePokemon>
            ))}
          </div>
        </div>

        <div className="favorite-pokemon">
          <button>
            {favorites.find(
              (pokemon: { name: string }) => (pokemon.name as string) === props.pokemon.name
            ) ? (
              <HeartIcon
                color="red"
                size={20}
                onClick={() => updateFavoritePokemons(props.pokemon)}
              />
            ) : (
              <HeartIcon size={20} onClick={() => updateFavoritePokemons(props.pokemon)} />
            )}
          </button>
        </div>
      </Card>
    </>
  )
}
