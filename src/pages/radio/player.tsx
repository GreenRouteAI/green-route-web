import { SkipPrevious, PlayArrow, SkipNext } from '@mui/icons-material';
import { Card, Box, CardContent, Typography, IconButton, CardMedia } from '@mui/material';
import LOGO from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Station {
  idArtists?: string;
}

export const RadioPlayer = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await axios.get('https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay');
        setStations(data?.data);
      } catch (error) {}
    };

    void fetch();
  }, [stations]);

  return (
    <Card sx={{ display: 'flex' }}>
      {[1].map((station, k) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='h5'>
                Live From Space
              </Typography>
              <Typography variant='subtitle1' color='text.secondary' component='div'>
                Lady Gaga
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label='previous'>{<SkipPrevious />}</IconButton>
              <IconButton aria-label='play/pause'>
                <PlayArrow sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label='next'>{<SkipNext />}</IconButton>
            </Box>
          </Box>
          <CardMedia component='img' sx={{ width: 151, background: '#00000050' }} image={LOGO} alt='Live from space album cover' />
        </>
      ))}
    </Card>
  );
};
