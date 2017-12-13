import React from 'react'
import { FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Grid from 'material-ui/Grid'
import styles from './index.scss'
import IconButton from 'material-ui/IconButton'
import Input, { InputAdornment } from 'material-ui/Input'
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
    <Grid container justify='center' spacing={12}>
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
                <IconButton>
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
          onChange={onChange}
          required
          fullWidth
          margin='normal'
        >
          <FormHelperText>Issue Description</FormHelperText>
          <Input
            type='text'
            name='description'
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
          <Button raised onClick={() => window.alert('Photo added')}>
            <Icon className={styles.iconLeft}>add_a_photo</Icon> Add Picture
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
