'use client';
import AppContext from "@/components/ContextProvider";
import { Button, Card, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { styled } from "@mui/system";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";

const PageWrapper = styled('div')({
  height: '100vh',
  width: '100%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

})

const LoginCard = styled(Card)({
    height: '450px',
    width: '750px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    borderRadius: '10px',
})

const LoginCardLeft = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'Center',
  rowGap: '10px'
})

const LoginCardRight = styled('div')({
  height: '100%',
  width: '100%',
  backgroundColor: '#F6F4EE',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'Center',
})

const StyledButton = styled(Button)({
  backgroundColor: '#E96A6A',
  borderColor: '#E96A6A',
})

const LoginOptions = styled('div')({
  height: '100px',
  width: '215px',
  display: 'flex'
})


const Login = () => {

  const [newUserName, setNewUserName] = useState('');

  // store for all our variables and states inside ContextProvider.tsx
  const appContext = useContext(AppContext)
  const { setUserName } = appContext

  // creating login button
  const router = useRouter();
  const handleLogIn = (event: any) =>{
    // oauth check would happen here
    // router.push('home');

    if (newUserName.length > 0) {
      setUserName(newUserName)
      router.push('home');
    }
  }

    return(
        <PageWrapper>
            <LoginCard 
              elevation={5}
            >
                <LoginCardLeft >
                    <TextField
                        label='Username'
                        id="username"
                        value={newUserName}
                        onChange={(event) => {
                          setNewUserName(event.target.value)
                        }}
                    />
                    <TextField
                        label='Password'
                        id="password"
                    />
                    <StyledButton 
                        variant="contained"
                        onClick={handleLogIn}
                      >
                          Login
                    </StyledButton>
                </LoginCardLeft>
                <LoginCardRight>
                  <Image 
                    src='/map.png'
                    alt="background"
                    width={350}
                    height={350}
                    unoptimized={true}
                  />
                </LoginCardRight>
            </LoginCard>
        </PageWrapper>
    )
}

export default Login