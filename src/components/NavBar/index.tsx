import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { PokemonContext } from '../../contexts/PokemonsContext'
import {
  Container,
  ContainerArrows,
  ContainerFavorites,
  ContainerStyledSearchBar,
  ContainerStyledSelect,
  StyledSearchbar
} from './styles'

export function NavBar() {
  const {
    page,
    category,
    setPage,
    setCategory,
    pokemons,
    getPokemons,
    searchValue,
    setSearchValue,
    debouncedChange,
    resetPokemons,
    showFavorites,
    favorites,
    defaultValue,
    setDefaultValue
  } = useContext(PokemonContext)

  const [options, setOptions] = useState<string[]>([])

  const onChangeInputHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(ev.target.value)
  }

  const onChangeSelectHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
    setCategory(ev.target.value)
    setDefaultValue(ev.target.value)
    setPage(0)
  }

  const nextPage = () => {
    if (category || (debouncedChange && debouncedChange.length > 2)) {
      if (page + 1 == Math.ceil(pokemons.length / 18)) return
    } else if (page === 71) return
    setPage((prevState) => prevState + 1)
  }

  const previousPage = () => {
    if (page === 0) return
    setPage((prevState) => prevState - 1)
  }

  async function getOptions() {
    const request = await fetch('https://pokeapi.co/api/v2/type/')
    const data = await request.json()
    const optionsData = data.results.map((option: { name: string }) => {
      return option.name
    })
    setOptions(optionsData)
  }

  useEffect(() => {
    getOptions()
  }, [])

  useEffect(() => {
    if (debouncedChange == '') {
      resetPokemons()
      return
    }
    if (debouncedChange && debouncedChange.length > 2) {
      setCategory('')
      setPage(0)
      getPokemons()
      return
    }
  }, [debouncedChange])

  return (
    <>
      <Container>
        <ContainerStyledSelect>
          <select onChange={onChangeSelectHandler} value={defaultValue}>
            {/* <optgroup label="selecione uma categoria"></optgroup> */}
            <option value="" hidden disabled>
              selecione uma categoria
            </option>
            {options.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
            {/* </optgroup> */}
          </select>
        </ContainerStyledSelect>

        <ContainerStyledSearchBar>
          <StyledSearchbar
            type="text"
            placeholder="Pesquisar Pokemon"
            value={searchValue}
            onChange={onChangeInputHandler}
          />
        </ContainerStyledSearchBar>

        <ContainerArrows>
          <button onClick={previousPage}>
            <GrFormPrevious />
          </button>
          {page + 1} /{' '}
          {category || (debouncedChange && debouncedChange.length > 2)
            ? Math.ceil(pokemons.length / 18)
            : 72}
          <button onClick={nextPage}>
            <GrFormNext />
          </button>
        </ContainerArrows>

        <ContainerFavorites>
          <div>{favorites.length}</div>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/pokeball--v1.png"
            alt="pokeball--v1"
            onClick={showFavorites}
          />
          {/* <img
            src="https://icons8.com/icon/63311/pokeball"
            height={48}
            width={48}
            onClick={showFavorites}
          /> */}
        </ContainerFavorites>
      </Container>
    </>
  )
}
