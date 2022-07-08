import React, { useState } from 'react';
import AddPostsForm from '../components/Issues/AddPostsForm';
import UserIssues from '../components/Issues/UserIssues';
import { Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const ButtonSx = {
  marginTop: '40px',
  marginBottom: '40px',
  backgroundColor: '#4b5320'
};

export default function Profile(props) {
  const {
    user,
    addIssue,
    deleteIssue,
    userIssues,
    editIssue,
    getMyIssues
  } = props;

  const [toggleIssue, setToggleIssue] = useState(false);

  return (
    <div style={{ textAlign: 'center', marginTop:'25px' }}>
      <h1 style={{ textAlign: 'center' }}>Welcome {user.username}!!</h1>
      <div style={{ marginTop: '40px' }}>
        <AddPostsForm addIssue={addIssue} />
      </div>

      <Button
        startIcon={!toggleIssue ? <Add /> : <Remove />}
        style={ButtonSx}
        variant="contained"
        size="small"
        onClick={() => setToggleIssue((prevState) => !prevState)}
      >
        {!toggleIssue ? 'Show your Posts' : 'Hide Posts'}
      </Button>
      {toggleIssue && (
        <div style={{ textAlign: 'left' }}>
          <UserIssues
            deleteIssue={deleteIssue}
            userIssues={userIssues}
            editIssue={editIssue}
            getMyIssues={getMyIssues}
            user={user}
          />
        </div>
      )}
    </div>
  );
}