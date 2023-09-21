import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

interface PokemonsProperties {
  id: number
  name: string
  types: any
  sprites: {
    front_default: string
  }
}

type PokemonsContextType = {
  setPokemons: Dispatch<SetStateAction<PokemonsProperties[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
  // setIndexPokemon: Dispatch<SetStateAction<number>>
  setIndexInicial: Dispatch<SetStateAction<number>>
  setIndexFinal: Dispatch<SetStateAction<number>>

  indexFinal: number
  indexInicial: number
  pokemons: PokemonsProperties[]
  setCategory: Dispatch<SetStateAction<string>>
  category: string
  loading: boolean
  indexPokemon: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
  getPokemons: () => Promise<void>
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  debouncedChange: string
  resetPokemons: () => void
  updateFavoritePokemons: (pokemon: PokemonsProperties) => void
  favorites: PokemonsProperties[]
  showFavorites: () => void
  store: () => void
  evolutionChainPokemon: any[]
  setEvolutionChainPokemon: Dispatch<SetStateAction<any[]>>
  evo: boolean
  setEvo: Dispatch<SetStateAction<boolean>>
  pokemonEvolution: string
  setPokemonEvolution: Dispatch<SetStateAction<string>>
  defaultValue: string
  setDefaultValue: Dispatch<SetStateAction<string>>
}

// getPokemons,
// page,
// setPage,
// indexPokemon,
// loading,
// category,
// setCategory,
// pokemons,
// indexInicial,
// indexFinal

export const PokemonContext = createContext({} as PokemonsContextType)

export const PokemonsContextProvider = (props: PropsWithChildren) => {
  const [pokemons, setPokemons] = useState<PokemonsProperties[]>([])
  const [category, setCategory] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [indexPokemon, setIndexPokemon] = useState<number>(0)
  const [indexInicial, setIndexInicial] = useState<number>(0)
  const [indexFinal, setIndexFinal] = useState<number>(18)
  const limit = 18
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedChange = useDebounce(searchValue)
  const [evo, setEvo] = useState<boolean>(false)
  const [pokemonEvolution, setPokemonEvolution] = useState<string>('')

  async function getPokemonURL(url: string) {
    const response = await fetch(url)
    return response.json()
  }

  const getPokemons = async () => {
    setIndexPokemon(page * limit)

    setLoading(true)

    // if (evo) {
    //   try {

    //     const response = await fetch(
    //       `https://pokeapi.co/api/v2/pokemon-species/${pokemonEvolution}/`
    //     )
    //     const data = await response.json()
    //     const evolutionChain = await fetch(data.evolution_chain.url)
    //     const evolutionChainData = await evolutionChain.json()

    //     evolutionChainPokemon.push(evolutionChainData.chain.species.name)

    //     for (let i = 0; i < evolutionChainData.chain.evolves_to.length; i++) {
    //       evolutionChainPokemon.push(evolutionChainData.chain.evolves_to[i].species.name)
    //       for (let j = 0; j < evolutionChainData.chain.evolves_to[i].evolves_to.length; j++) {
    //         evolutionChainPokemon.push(
    //           evolutionChainData.chain.evolves_to[i].evolves_to[j].species.name
    //         )
    //       }
    //     }

    //     // evolutionChainPokemon.push(evolutionChainData.chain.evolves_to[0].species.name)
    //     // evolutionChainPokemon.push(evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name)

    //     evolutionChainPokemon.forEach((pokemon) => {
    //       return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    //     })

    //     const pokemonsData = evolutionChainPokemon.map((name) => {
    //       return getPokemonURL(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    //     })

    //     const results = await Promise.all(pokemonsData)
    //     setPokemons(results)

    //     evolutionChainPokemon.length = 0
    //     setEvo(false)
    //   } catch {
    //   } finally {
    //   }
    // } else

    if (evo) {
      return
    }
    if (category) {
      try {
        const request = await fetch(`https://pokeapi.co/api/v2/type/${category}`)
        const data = await request.json()

        const pokemonsData = data.pokemon.map(async (pokemon: { pokemon: { url: string } }) => {
          return await getPokemonURL(pokemon.pokemon.url)
        })

        const results = await Promise.all(pokemonsData)

        setPokemons(results)
        setIndexInicial(page * 18)
        setIndexFinal((page + 1) * 18)
      } catch {
      } finally {
      }
    } else if (debouncedChange && debouncedChange.length > 2) {
      try {
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
        const data = await request.json()

        const pokemonsData = data.results
          .filter((pokemon: { name: any[] }) => pokemon.name.includes(debouncedChange))
          .map(async (pokemon: { url: string }) => {
            return await getPokemonURL(pokemon.url)
          })

        const results = await Promise.all(pokemonsData)

        setPokemons(results)
        setIndexInicial(page * 18)
        setIndexFinal((page + 1) * 18)
      } catch {
      } finally {
      }
    } else {
      try {
        const request = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${indexPokemon}`
        )
        const data = await request.json()

        const pokemonsData: PokemonsProperties[] = data.results.map(
          async (pokemon: { url: string }) => {
            return await getPokemonURL(pokemon.url)
          }
        )

        const results = await Promise.all(pokemonsData)
        setIndexInicial(0)
        setIndexFinal(18)
        setPokemons(results)
      } catch {
      } finally {
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const [defaultValue, setDefaultValue] = useState<string>('')

  function resetPokemons() {
    setCategory('')
    setDefaultValue('')
    setSearchValue('')
    setEvo(false)
    setPage(0)
    getPokemons()
    // setEvo(false)
    // setIndexInicial(0)
    // setIndexFinal(18)
  }

  const store = () => {
    localStorage.setItem('pokemonsFavorites', JSON.stringify(favorites))
  }

  const [favorites, setFavorites] = useState(() => {
    const storagedFavorites = localStorage.getItem('pokemonsFavorites')
    if (storagedFavorites) return JSON.parse(storagedFavorites) as PokemonsProperties[]
    return []
  })

  const updateFavoritePokemons = (pokemon: PokemonsProperties) => {
    const updatedFavorites = [...favorites]

    if (
      favorites.find(
        (pokemonFavorite: { name: string }) => (pokemonFavorite.name as string) === pokemon.name
      )
    ) {
      setFavorites(
        updatedFavorites.filter((pokemonFavorite: { name: string }) => {
          return pokemonFavorite.name !== pokemon.name
        })
      )
      return
    } else {
      if (favorites.length >= 5) return
      updatedFavorites.push(pokemon)
      setFavorites(updatedFavorites)
    }
  }

  function showFavorites() {
    setIndexInicial(0)
    setIndexFinal(18)
    setPokemons(favorites)
  }

  const [evolutionChainPokemon, setEvolutionChainPokemon] = useState<any[]>([])

  return (
    <PokemonContext.Provider
      value={{
        getPokemons,
        page,
        setPage,
        indexPokemon,
        loading,
        category,
        setCategory,
        pokemons,
        setPokemons,
        indexInicial,
        setIndexInicial,
        indexFinal,
        setIndexFinal,
        searchValue,
        setSearchValue,
        debouncedChange,
        resetPokemons,
        updateFavoritePokemons,
        favorites,
        showFavorites,
        store,
        evolutionChainPokemon,
        setEvolutionChainPokemon,
        setLoading,
        evo,
        setEvo,
        pokemonEvolution,
        setPokemonEvolution,
        defaultValue,
        setDefaultValue
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  )
}
