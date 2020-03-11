import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone'

const Dropzone = props => {
  return ( 
    <DropzoneArea
        acceptedFiles={['image/*', '.doc', '.docx', '.pdf']}
        dropzoneText='Drop a file here or click'
        filesLimit={1}
        onChange={file => {props.handleChange(file)}}
      />
  )
}

export default Dropzone;