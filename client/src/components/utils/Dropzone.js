import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line
const useStyles = makeStyles(theme => ({
  root: {
      '& > *': {
          margin: theme.spacing(1),
      },
  },
  input: {
      display: 'none',
  },
}));

const Dropzone = props => {
  return ( 
    <input type="file" name="file" onChange={props.handleChange} />
  )
}

export default Dropzone;