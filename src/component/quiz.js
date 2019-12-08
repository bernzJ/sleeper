import React from 'react'

import { Accordion, Card, Col, Container, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'

import Colors from '../assets/colors'
import Quizs from '../data/quizs'
import { aff } from '../data/site'

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.keyCount = 0;
    this.state = {
      activeKey: '0',
      message: '',
      email: {
        value: false,
        error: '',
      },
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer5: "",
    }
  }

  validateEmail = () => {
    let email = this.state.email.value;
    if (email !== false && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ email: { value: email, error: '' }, activeKey: '1' })
    } else {
      this.setState({ email: { value: false, error: 'Invalid Email !' }, activeKey: '0' })
    }
  }

  partitionArray = (array, size) => array.map((e, i) => (i % size === 0) ? array.slice(i, i + size) : null).filter((e) => e)

  genKey = () => this.keyCount++

  finializeQuiz = (id, choice) => {
    let priceRange = this.state.answer3
    let userAff = aff.find(a => a.choices.includes(priceRange))
    this.setState({ message: 'Your mattress is ready !', activeKey: '999', answer5: userAff, [`answer${id}`]: choice })
  }

  renderLastSlide = () => {
    let userAff = this.state.answer5
    return (
      <Container>
        <Row onClick={() => window.open(userAff.url, "_blank")}>
          <QuizCol lg="12">
            According to your answers, the {userAff.mattress} mattress is best for you. Click here to check prices !
          </QuizCol>
          <QuizCol lg="12">
            <img src={userAff.thumbnail} alt={userAff.mattress} />
          </QuizCol>
        </Row>
      </Container>
    )
  }

  render() {
    return (
      <QuizBox lg="6">
        <Accordion activeKey={this.state.activeKey}>
          <Card>
            <CardHeader onClick={() => this.setState({ activeKey: '0' })}>
              <Container fluid>
                <span>
                  Are you ready to start the quiz ?
                </span>
              </Container>
            </CardHeader>
            <Accordion.Collapse eventKey="0">
              <CardBody>
                <Form onSubmit={(e) => e.preventDefault() || this.validateEmail()}>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.setState({ email: { value: e.target.value } })} />
                </Form>
                <ErrorLabel>{this.state.email.error}</ErrorLabel>
              </CardBody>
            </Accordion.Collapse>
          </Card>
          {
            Quizs.map(quiz => {
              return (
                <Card key={quiz.id}>
                  <CardHeader>
                    <Container fluid>
                      <Row className="justify-content-between">
                        <Col lg="5">
                          <span>
                            {quiz.question}
                          </span>
                        </Col>
                        <Col lg="3">
                          <span>
                            {this.state[`answer${quiz.id}`]}
                          </span>
                        </Col>
                      </Row>
                    </Container>
                  </CardHeader>
                  <Accordion.Collapse eventKey={quiz.id}>
                    <CardBody>
                      <Container fluid>
                        {
                          this.partitionArray(quiz.choices, 3).map(e =>
                            <QuizRow key={`row-${this.genKey()}`}>
                              {e.map((choice, i) => {
                                return (
                                  <QuizCol key={`col-${this.genKey()}`}>
                                    <QuizItem onClick={() => quiz.last === true ? this.finializeQuiz(quiz.id, choice) : this.setState({ [`answer${quiz.id}`]: choice, activeKey: (parseInt(quiz.id) + 1).toString() })}>
                                      {choice}
                                    </QuizItem>
                                  </QuizCol>
                                )
                              })}
                            </QuizRow>
                          )
                        }
                      </Container>
                    </CardBody>
                  </Accordion.Collapse>
                </Card>
              )
            })
          }
          <Card>
            <CardHeader onClick={() => this.setState({ activeKey: '999' })}>
              <Container fluid>
                <span>
                  {this.state.message}
                </span>
              </Container>
            </CardHeader>
            <Accordion.Collapse eventKey="999">
              <CardBody>
                {this.state.answer5 !== '' ? this.renderLastSlide() : null}
              </CardBody>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </QuizBox>
    )
  }
}

const QuizBox = styled(Col)`
&{
  background-color: rgba(0,0,0,0.1);
  padding: 25px;
}
& span{
  color: ${Colors.font}
}
`
const ErrorLabel = styled.label`
color: red;
`
const CardHeader = styled(Card.Header)`
background-color: ${Colors.primary};
`
const CardBody = styled(Card.Body)`
background-color: ${Colors.secondary};
`
const QuizRow = styled(Row)`
text-align: center;
`
const QuizItem = styled.span`
&{
  color: #fff;
  padding-right: 25px;
  padding-left: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #c1c1c1;
  display: block;
  width: 100%;
  white-space: nowrap;
}
&:hover, &.selected{
  background-color: ${Colors.primary};
}
`
const QuizCol = styled(Col)`
margin-top: 25px;
`


export default Quiz;