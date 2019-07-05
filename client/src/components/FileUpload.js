import React, { Fragment, useState } from 'react'
import axios from 'axios';
import '../spiny.css';





const FileUpload = () => {

  const [ file, setFile ] = useState('');
  const [ filename, setFilename] = useState('Choose File ');
  const [uploadedFile, setUploadedFile] = useState({})
  
  const onChange = e => {
    setFile(e.target.files[0]); // html can take in multiple files but we only want one - so setting the array at 0 fo 1 file
    setFilename(e.target.files[0].name); //tried renaming here but this is just in the text area box
    
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

      //newFiles.push(filePath); //this is where i tested storing the file paths. but an array will only work on local storage and you can't requeszt a file list client side only -- so maybe a json object stored in mongodb
      //console.log(newFiles)

    } catch(err){
      if(err.response.status === 500){
        console.log('There was a problem with the server')
      } else{
        console.log(err.response.data.msg)
      }

    }

  }

  function createthingy(array){
  
    var spinspace = document.createElement('div');
    spinspace.className = "spinspace";
    var containerdiv = document.createElement('div');
    containerdiv.className = "scene";
    var plant = document.createElement('div');
    plant.className = "plant";
    for (var c in array) {  
      var div = document.createElement('div');
      div.className = "img";
      containerdiv.appendChild(div)
      var div2 = document.createElement('div');
      div2.className = "img__content";
      var myImage = new Image();
      myImage.src = array[c]
      div2.appendChild(myImage)
      div.appendChild(div2)
      plant.appendChild(div);
      containerdiv.appendChild(plant);
      spinspace.appendChild(containerdiv)
      document.body.appendChild(spinspace)
    }
  }

const checkarray = uploadedFile ? uploadedFile.filePath : ''

let newFiles = [checkarray]
  
createthingy(newFiles)

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
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FileUpload
