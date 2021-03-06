import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'
import { REPORTED, SCHEDULED, IN_PROGRESS } from '../../lib/issue'

const IssueStatus = ({ value, disabled }) => (
  <RadioGroup aria-label='status' name='status' value={value} row>
    <FormControlLabel
      value={REPORTED}
      control={<Radio />}
      label='Reported'
      disabled={disabled}
    />
    <FormControlLabel
      value={SCHEDULED}
      control={<Radio />}
      label='Scheduled'
      disabled={disabled}
    />
    <FormControlLabel
      value={IN_PROGRESS}
      control={<Radio />}
      label='In Progress'
      disabled={disabled}
    />
  </RadioGroup>
)

export default IssueStatus
