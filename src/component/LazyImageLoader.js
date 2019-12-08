import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const LazyImageLoader = ({ src, imgProps }) => {
  const [loaded, setLoaded] = useState({
    class: "blur",
    src: ""
  })

  /*let img = new Image();
  img.src = src;
  img.onload = () => setLoaded({
    class: "loaded",
    src: src
  })*/

  return (
    <Wrapper className={loaded.class}>
      <div style={{ ...imgProps, backgroundImage: `url(${loaded.src})` }} />
      <GImage src={src} onLoad={() => setLoaded({
        class: "loaded",
        src: src
      })} />
    </Wrapper>
  )
}

LazyImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
}

const Wrapper = styled.div`
&{
  filter: blur(15px);
  height: 100%;
  width: 100%;
}
&.loaded{
  filter: blur(0);
  transition: filter .3s;
}
& div {
  opacity: 0;
  height: 100%;
  background-repeat:no-repeat;
  background-position: center;
}
&.loaded div {
  opacity: 1;
  transition: opacity .3s;
}
`
const GImage = styled.img`
display: none;
`

export default LazyImageLoader