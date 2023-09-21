import styled from 'styled-components'

type ContainerProps = {
  loading: number
}

export const Container = styled.div<ContainerProps>`
  display: ${({ loading }) => (loading ? 'none' : 'grid')};
  /* display: grid; */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;
  margin: 0 auto;
  width: min(80vw, 1000px);
  padding: 120px 0;

  @media (max-width: 645px) {
    place-items: center;
  }
`
