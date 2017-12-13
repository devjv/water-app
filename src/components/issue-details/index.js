import React from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Typography from 'material-ui/Typography'
import { humanizeLocation } from '../../lib/location'
import IssueStatus from '../issue-status'
import Button from 'material-ui/Button'
import moment from 'moment'
import DrawerTitle from '../drawer-title'
import styles from './index.scss'
import { LOW, MEDIUM, HIGH } from '../../lib/issue'

const priorityColors = {
  [LOW]: '#46AA96',
  [MEDIUM]: '#3182BD',
  [HIGH]: '#DE2C26'
}

const IssueDetails = ({ issue, onDelete }) => {
  const {
    location,
    description,
    status,
    canDelete,
    updatedAt,
    priority
  } = issue
  return (
    <div style={{ overflowX: 'hidden' }}>
      <DrawerTitle>Issue Details</DrawerTitle>
      <Grid container justify='center' spacing={12}>
        <Grid item xs={10}>
          <FormControl margin='normal' fullWidth>
            <FormHelperText>Issue Location</FormHelperText>
            <Typography type='body1' component='p'>
              {humanizeLocation(location)}
            </Typography>
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <FormHelperText>Issue Description</FormHelperText>
            <Typography type='body1' component='p'>
              {description}
            </Typography>
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <FormHelperText>Issue Priority</FormHelperText>
            <Typography type='body1' component='p'>
              <div
                className={styles.priorityColors}
                style={{ backgroundColor: priorityColors[priority] }}
              />
              {priority}
            </Typography>
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <FormHelperText>
              Issue Status (last update: {moment(updatedAt).calendar()})
            </FormHelperText>
            <IssueStatus value={status} disabled />
          </FormControl>
        </Grid>
      </Grid>
      {canDelete && (
        <FormControl fullWidth>
          <Button raised onClick={onDelete}>
            Delete Report
          </Button>
        </FormControl>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  issue: state.reports[state.location.payload.issueId]
})

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onDelete: () => {
    dispatch({ type: 'HOME' })
    dispatch({ type: 'REMOVE_REPORT', payload: stateProps.issue.id })
  }
})

export default connect(mapStateToProps, null, mergeProps)(IssueDetails)
