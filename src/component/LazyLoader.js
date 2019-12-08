import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'react-bootstrap'

const LazyLoader = ({ callback, props }) => {
  let Component = lazy(callback)
  return (
    <Suspense fallback={<Spinner animation="grow" />}>
      <Component {...props} />
    </Suspense>
  )
}

LazyLoader.propTypes = {
  callback: PropTypes.func.isRequired,
}

export default LazyLoader