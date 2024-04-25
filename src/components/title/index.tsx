import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <Link to='/' style={{ textDecoration: 'none' }}>
      <Box display='flex' alignItems='center' gap={'12px'}>
        <Typography color='#00accb' fontSize='1.2rem' fontFamily='sans-serif' fontWeight='bold'>
          {!collapsed ? 'Green Route' : 'G.R'}
        </Typography>
      </Box>
    </Link>
  );
};
