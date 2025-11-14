import { FormControl, FormControlLabel, Stack, Switch, Typography } from '@mui/material';

const TouchIdFeatures = () => {
  return (
    <Stack direction="column" spacing={3}>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Manage 2FA Features
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Use Touch ID to unlock your login page"
          sx={{ gap: 2, ml: 0 }}
        />
      </FormControl>
    </Stack>
  );
};

export default TouchIdFeatures;
