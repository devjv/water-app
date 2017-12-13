import React from 'react'
import TextField from 'material-ui/TextField'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'
import Divider from 'material-ui/Divider'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import styles from './index.scss'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { humanizeLocation } from '../../lib/location'
import DrawerTitle from '../drawer-title'

// priorities
const LOW = 'low'
const MEDIUM = 'medium'
const HIGH = 'high'

const IssueForm = ({
  location = { lat: 0, lon: 0 },
  description = '',
  priority = LOW,
  photos = [],
  onGetLocation = f => f,
  onChange = f => f,
  onSubmit = f => f
}) => (
  <form className={styles.form}>
    <DrawerTitle>Create New Issue</DrawerTitle>
    <Grid container justify='center'>
      <Grid item xs={10}>
        <FormControl
          name='location'
          label='Issue Location'
          value={humanizeLocation(location)}
          required
          fullWidth
          disabled
          margin='normal'
        >
          <FormHelperText htmlFor='location'>Issue Location</FormHelperText>
          <Input
            type='text'
            value={humanizeLocation(location)}
            endAdornment={
              <InputAdornment position='end' onClick={onGetLocation}>
                <IconButton mini>
                  <Icon size={10}>my_location</Icon>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          name='description'
          label='Issue Description'
          value={humanizeLocation(location)}
          required
          fullWidth
          margin='normal'
        >
          <FormHelperText>Issue Description</FormHelperText>
          <Input
            type='text'
            value={description}
            placeholder='E.g. what is broken, symptoms'
          />
        </FormControl>
        <FormControl component='fieldset' required fullWidth margin='normal'>
          <FormHelperText htmlFor='priority'>Issue Priority</FormHelperText>
          <RadioGroup
            aria-label='priority'
            name='priority'
            value={priority}
            onChange={onChange}
            row
          >
            <FormControlLabel value={LOW} control={<Radio />} label='Low' />
            <FormControlLabel
              value={MEDIUM}
              control={<Radio />}
              label='Medium'
            />
            <FormControlLabel value={HIGH} control={<Radio />} label='High' />
          </RadioGroup>
        </FormControl>
        <FormControl margin='normal' fullWidth>
          <Button raised>
            <Icon>add_a_photo</Icon> Add Picture
          </Button>
        </FormControl>
      </Grid>
    </Grid>

    <footer className={styles.formFooter}>
      <FormControl fullWidth>
        <Button raised color='primary' fullWidth onClick={onSubmit}>
          Send Report
        </Button>
      </FormControl>
    </footer>
  </form>
)

export default IssueForm
