import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const REPORTED = 0
const SCHEDULED = 1
const IN_PROGRESS = 2

const IssueStatus = ({ value }) => (
  <RadioGroup aria-label='status' name='status' value={value} row>
    <FormControlLabel value={REPORTED} control={<Radio />} label='Reported' />
    <FormControlLabel value={SCHEDULED} control={<Radio />} label='Scheduled' />
    <FormControlLabel
      value={IN_PROGRESS}
      control={<Radio />}
      label='In Progress'
    />
  </RadioGroup>
)

export default IssueStatus
