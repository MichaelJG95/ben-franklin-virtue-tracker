import React from 'react'
import PT from 'prop-types'


export default function Spinner({ on }) {
  if (!on) return null
  return (
      <h3 id="spinner">Please wait...</h3>
  )
}

Spinner.propTypes = {
  on: PT.bool.isRequired,
}
