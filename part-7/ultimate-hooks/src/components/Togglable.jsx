import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div className="my-3">
      <div style={hideWhenVisible}>
        <button className="btn btn-primary" onClick={() => setVisible(true)}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="btn btn-link text-danger"
          onClick={() => setVisible(false)}
        >
          cancel
        </button>
      </div>
    </div>
  )
}

export default Togglable
