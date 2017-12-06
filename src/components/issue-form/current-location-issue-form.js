import IssueForm from './issue-form'
import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'

const mapStateToProps = ({ map: { center } }) => ({
  location: center
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location } = stateProps
  const { dispatch } = dispatchProps
  const { description, priority } = ownProps

  return {
    ...ownProps,
    ...stateProps,
    onSubmit: () => {
      dispatch({
        type: 'ADD_REPORT',
        payload: {
          report: {
            location,
            description,
            priority,
            pictures: [] // TODO
          }
        }
      })
      dispatch({ type: 'HOME' })
    }
  }
}

const stateHandlers = {
  onChange: state => event => {
    return {
      ...state,
      [event.target.name]: event.target.value
    }
  }
}

const initialState = {
  priority: 'low',
  description: ''
}

export default compose(
  withStateHandlers(initialState, stateHandlers),
  connect(mapStateToProps, null, mergeProps)
)(IssueForm)
