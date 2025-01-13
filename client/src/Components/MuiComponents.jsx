import React from 'react'
import Button from '@mui/material/Button';

function MuiButton(props) {
  return (
    <div>
        <Button variant="contained"  sx={{ 
        backgroundColor: props.bg, 
        borderRadius: '50px',  // Make the button round
        padding: '10px 20px',  // Adjust padding for better appearance
        color: props.bg=='white'?'black':'white',
        textTransform: 'none',
        textDecoration: 'none',
        fontSize: '1.25rem', /* 18px */
        lineHeight: '1.75rem', /* 28px */
        '&:hover': {
          backgroundColor: 'darkgray'
        }
      }} >
        {props.text}</Button>
    </div>
  )
}

export {MuiButton};
