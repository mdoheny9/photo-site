import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostCard from './PostCard';

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function Profile() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  let { username } = useParams();
  const targetUsername = username;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileUsername, setProfileUsername] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        if (!targetUsername) { // Redirect from "My Profile"
          const res = await fetch(`http://localhost:8080/api/profile`, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
          });
          const { username, posts } = await res.json();
          setProfileUsername(username);
          setData(posts);

        } else {
          const res = await fetch(`http://localhost:8080/api/${targetUsername}`, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
          });
          const { posts } = await res.json();
          setProfileUsername(username);
          setData(posts);
        }

      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false);

      }
    } 

    fetchData();

  }, []);

  if (loading) {
    return (
        <Typography variant="h3" gutterBottom>
          Loading...
        </Typography>
    )
  }

  if (!profileUsername) {
    return (
      <Typography variant="h3" color='red' gutterBottom>
        No user found
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          {profileUsername}'s Gallery
        </Typography>
        <Typography>View the latest uploads from your community!</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {data.map((postData, index) => (
          <PostCard key = {index} cardData = {postData} />
        ))}
      </Grid>
    </Box>
  );
}