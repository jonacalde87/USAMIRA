import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const initIssueInputs = {
  base: '',
  state:'',
  description: '',
};

const ButtonSx = {
  width: '300px',
  margin: '0 auto',
  marginTop: '10px',
  backgroundColor:'#4b5320'
};

export default function AddIssueForm(props) {
  const { addIssue } = props;
  const [issueInputs, setIssueInputs] = useState(initIssueInputs);
  const [descriptionRows] = useState(10);

  const AddIssueFormSx = {  
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto'
  };

  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setIssueInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    addIssue(issueInputs);
    setIssueInputs(initIssueInputs) // to clear inputs after submit
  };

  return (
    <div style={AddIssueFormSx}>

      <h3 style={{textAlign:'center', marginTop: '-20px'}}
        >We appreciate you leaving reviews of any military installations you have visited.
      </h3>
      <TextField
        label="Base"
        name="base"
        value={issueInputs.base}
        onChange={handleIssueChange}
        helperText={`${issueInputs.base.length}/30`}
      />
      <TextField
        label="State"
        name="state"
        value={issueInputs.state}
        onChange={handleIssueChange}
        helperText={`${issueInputs.state.length}/30`}
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={descriptionRows}
        value={issueInputs.description}
        onChange={handleIssueChange}
        helperText={`${issueInputs.description.length}/1000`}
      />

      {/* <p style={{color:"red"}}>{errMsg}</p> */}

      <Button
        style={ButtonSx}        
        variant="contained"
        size="small"
        onClick={handleSubmitIssue}
      >
        Submit Post
      </Button>
    </div>
  );
}