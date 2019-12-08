import React from 'react'
import styled from 'styled-components'
import { Container, Row } from 'react-bootstrap'


const Footer = () => {
  return (
    <Foot>
      © 2020 Something. All rights reserved.
    </Foot>
  )
}

const Foot = styled(Row)`
padding: 50px;
`

export default Footer;