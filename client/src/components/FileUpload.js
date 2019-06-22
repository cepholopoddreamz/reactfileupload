import React, { Fragment, useState } from 'react'
import axios from 'axios';

const FileUpload = () => {

  const [ file, setFile] = useState('');
  const [ filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({})
  
  const onChange = e => {
    setFile(e.target.files[0]); // html can take in multiple files but we only want one - so setting the array at 0 fo 1 file
    setFilename(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    //makes the request to the server
    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        //progress bar stuff goes here
      })

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

    } catch(err){
      if(err.response.status === 500){
        console.log('There was a problem with the server')
      } else{
        console.log(err.response.data.msg)
      }

    }

  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
          <label className="custom-file-label" htmlFor="customFile">
            Choose file
            {filename}
          </label>
        </div>
        <input 
          type="submit" 
          value="Upload" 
          className="btn btn-primary btn-block">
        </input>
      </form>
    </Fragment>
  )
}

export default FileUpload
