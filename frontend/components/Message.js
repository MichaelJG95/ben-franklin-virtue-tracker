import React from 'react'
import PT from 'prop-types'

export default function Message({ message }) {
  return (
    <div key={message} id="message">
      {message}
    </div>
  )
}

Message.propTypes = {
  message: PT.string.isRequired,
}
