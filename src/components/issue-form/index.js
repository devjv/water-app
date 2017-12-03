import React from 'react'
import TextField from 'material-ui/TextField'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'
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

const IssueForm = ({
  location,
  description,
  priority,
  photos,
  onGetLocation,
  onChange
}) => (
  <form className={styles.form}>
    <Grid container justify='center'>
      <Grid item xs={10}>
        <FormControl
          name='location'
          label='Location'
          value={humanizeLocation(location)}
          required
          fullWidth
          disabled
          margin='normal'
        >
          <InputLabel htmlFor='location'>Location</InputLabel>
          <Input
            type='text'
            value={humanizeLocation(location)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={onGetLocation}>
                  <Icon>my_location</Icon>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          name='description'
          label='Issue Description'
          value={description}
          required
          fullWidth
          margin='normal'
        />
        <FormControl component='fieldset' required fullWidth margin='normal'>
          <FormLabel component='legend'>Issue Priority</FormLabel>
          <RadioGroup
            aria-label='priority'
            name='priority'
            value={priority}
            row
          >
            <FormControlLabel value='low' control={<Radio />} label='Low' />
            <FormControlLabel
              value='medium'
              control={<Radio />}
              label='Medium'
            />
            <FormControlLabel value='high' control={<Radio />} label='High' />
          </RadioGroup>
        </FormControl>
        <FormControl margin='normal' fullWidth>
          {photos.map(file => (
            <Paper>
              <Typography type='body1' component='p'>
                {file.name}
              </Typography>
            </Paper>
          ))}
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
        <Button raised color='primary' fullWidth>
          Send Report
        </Button>
      </FormControl>
    </footer>
  </form>
)

export default IssueForm
