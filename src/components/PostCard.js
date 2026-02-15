import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ cardData }) {
    const author = cardData.author;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <Typography variant="caption">{author.name}</Typography>
      </Box>
      <Typography variant="caption">{cardData.date}</Typography>
    </Box>
  );
}

export default function PostCard({ cardData }) {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <Grid size={{ xs: 12, md: 4 }}>
            <StyledCard
                variant="outlined"
                onFocus={() => handleFocus(5)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                sx={{ height: '100%' }}
            >
                <CardMedia
                component="img"
                alt= "A really cool picture"
                image={cardData.img}
                sx = {{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                />
                    <StyledCardContent>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {cardData.description}
                        </StyledTypography>
                    </StyledCardContent>
                <Author cardData = {cardData} />
            </StyledCard>
        </Grid>
    );
}