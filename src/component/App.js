import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

import HeaderImg from '../assets/header.jpg'
import LazyImageLoader from './LazyImageLoader'
import LazyLoader from './LazyLoader'
import Quiz from './quiz'
import Footer from './footer'

class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Header className="w-100">
          <LazyImageLoader src={HeaderImg} imgProps={{ backgroundSize: 'cover' }} />
        </Header>
        <QuizWrapper className="justify-content-center align-items-center">
          <Quiz />
        </QuizWrapper>
        <Footer />
      </Container>
    )
  }
}

const Header = styled(Row)`
position: absolute;
height: 680px;
z-index: -1;
`
const QuizWrapper = styled(Row)`
height: 680px;
`

export default App;
