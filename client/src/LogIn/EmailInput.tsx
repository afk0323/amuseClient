import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

interface EmailInputProps {
  email: string;
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, handleChangeEmail }) => {
  return (
    <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
      <TextField id="standard-basic" type='email' label="아이디(이메일 계정)" variant="standard" value={email} onChange={handleChangeEmail} sx={{ width: "680px", bgcolor: 'transparent'}} />
    </FormControl>
  );
}

export default EmailInput;