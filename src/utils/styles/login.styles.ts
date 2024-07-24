// utils/styles/login.styles.ts
import { styled } from "@mui/system";
import { Button, Card } from "@mui/material";

export const PageWrapper = styled('div')({
  height: '100vh',
  width: '100%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const LoginCard = styled(Card)({
  height: '450px',
  width: '750px',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  borderRadius: '10px',
});

export const LoginCardLeft = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '10px',
});

export const LoginCardRight = styled('div')({
  height: '100%',
  width: '100%',
  backgroundColor: '#F6F4EE',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledButton = styled(Button)({
  backgroundColor: '#E96A6A',
  borderColor: '#E96A6A',
});
