import IssueForm from './issue-form'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { formAction, locateUserThunk, clearForm } from '../../store/actions'
import { REPORTED } from '../../lib/issue'
import { refreshMap } from '../../lib/map-helpers'

const mapStateToProps = state => ({
  location: state.map.center,
  description: state.form.description,
  priority: state.form.priority,
  photos: state.form.photos
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location, description, priority, photos } = stateProps
  const { dispatch } = dispatchProps

  return {
    ...ownProps,
    ...stateProps,
    onChange: e => {
      dispatch(formAction(e.target.name, e.target.value))
    },
    onGetLocation: () => dispatch(locateUserThunk()),
    onSubmit: () => {
      dispatch({
        type: 'ADD_REPORT',
        payload: {
          report: {
            location,
            description,
            priority,
            status: REPORTED,
            pictures: []
          }
        }
      })
      dispatch(clearForm)
      dispatch({ type: 'HOME' })
      refreshMap()
    }
  }
}

export default compose(connect(mapStateToProps, null, mergeProps))(IssueForm)
