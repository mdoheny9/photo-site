import React, { useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone'

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

import FileUpload from './FileUpload';
// import Post from '../../../backend/model/Post';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  function handleSubmit() {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    const postData = new FormData();
    postData.append("img", file);
    postData.append();
    // const newPost = new Post({
    //   img: {},
    //   description: {},
    //   author: {},
    // });
  }

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          Display name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="mbread59"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 7 }}>
        <FileUpload />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Post description
        </FormLabel>
        <OutlinedInput
          placeholder="Write a description for your post"
          required
          size="small"
        />
      </FormGrid>
    </Grid>
  );
}
