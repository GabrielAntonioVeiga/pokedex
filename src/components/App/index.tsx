import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../../assets/styles/global'
import { MyTheme } from '../../assets/styles/themes/default'
import { PokemonsContextProvider } from '../../contexts/PokemonsContext'
import Loader from '../Loader'
import { NavBar } from '../NavBar'
import { PokemonDisplay } from '../PokemonDisplay'
import { Title } from '../Title'

function App() {
  return (
    <>
      <ThemeProvider theme={MyTheme}>
        <PokemonsContextProvider>
          <GlobalStyles />
          <Title />
          <NavBar />
          <Loader />
          <PokemonDisplay />
        </PokemonsContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
