import React from 'react'

class Errors extends React.Component {
  render() {
    const { errors, message } = this.props
    return (
      <div>
        <div>
          {errors &&
            <div className="error-div">
              <h2 className="error-header">Errors:</h2>
              <ul className="error-list">
                {Object.keys(errors).map((key, index) => {
                  return (
                    <li className="error-text" key={index}>
                      <i>*</i>
                      {' '}
                      {key}
                      {' '}
                      {errors[key].join(', ')}
                    </li>)
                })
                }
              </ul>
            </div>
          }
        </div>
        <div>
          {!errors &&
            <div>
              <p>{message}</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Errors
