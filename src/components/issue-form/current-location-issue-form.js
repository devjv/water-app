import IssueForm from './issue-form'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { formAction } from '../../store/actions'

const mapStateToProps = state => ({
  location: state.map.center,
  description: state.form.description,
  priority: state.form.priority,
  photos: state.form.photos
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location } = stateProps
  const { dispatch } = dispatchProps
  const { description, priority } = ownProps

  return {
    ...ownProps,
    ...stateProps,
    onChange: e => {
      dispatch(formAction(e.target.name, e.target.value))
    },
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

export default compose(
  connect(mapStateToProps, null, mergeProps)
)(IssueForm)
