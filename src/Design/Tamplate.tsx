import React, { useReducer, useRef, useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import './Tamplate.css';
import { Active } from '../Activetask/Active';

// Define the initial state for the reducer
const initialState = {
  inputValue: ''
};

// Define the reducer function
const reducer = (state: typeof initialState, action: { type: string, payload?: string }) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.payload || '' };
    case 'CLEAR_INPUT':
      return { ...state, inputValue: '' };
    default:
      return state;
  }
};

export const Tamplate = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState<string>(''); // For passing to Active component
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_INPUT_VALUE', payload: event.target.value });
  };

  const Propclick = () => {
    setInputVal(state.inputValue); // Set the value from the reducer's state
    clear(); // Clear input after storing value
  };

  const clear = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input field directly
    }
    dispatch({ type: 'CLEAR_INPUT' }); // Clear the input in the reducer's state
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: '0 20px' }}
      >
        <div>
          <h1>Todo-List</h1>
          <TextField
            className='input'
            label="Enter text"
            variant="outlined"
            value={state.inputValue} // Use reducer state for input value
            inputRef={inputRef}
            onChange={handleChange} // Call handleChange directly
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={Propclick}
                    sx={{ borderRadius: '50%' }}
                  >
                    Go
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Box>
      <Active value={inputVal} /> {/* Pass the stored value */}
    </>
  );
};
