import React from 'react'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import style from './index.scss'

const DrawerTitle = ({ children }) => (
  <div>
    <Grid container justify='center'>
      <Grid item xs={10}>
        <FormControl fullWidth>
          <FormHelperText className={style.container}>
            {children}
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
    <Divider />
  </div>
)

export default DrawerTitle
