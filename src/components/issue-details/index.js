import React from 'react'
import { InputLabel } from 'material-ui/Input'
import Grid from 'material-ui/Grid'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Typography from 'material-ui/Typography'
import { humanizeLocation } from '../../lib/location'
import IssueStatus from '../issue-status'
import Button from 'material-ui/Button'
import moment from 'moment'

const IssueDetails = ({
  location,
  description,
  status,
  canDelete,
  updatedAt
}) => (
  <div>
    <Grid container justify='center'>
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
          <FormHelperText>
            Issue Status (last update: {moment(updatedAt).calendar()})
          </FormHelperText>
          <IssueStatus value={status} />
        </FormControl>
      </Grid>
    </Grid>
    {canDelete && (
      <FormControl fullWidth>
        <Button raised>Delete Report</Button>
      </FormControl>
    )}
  </div>
)

export default IssueDetails
