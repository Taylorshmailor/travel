'use client';
import { Button, Card, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Image from 'next/image'

const PageWrapper = styled('div')({
  height: '100vh',
  width: '100%',
  backgroundColor: '#F5F5F5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

})

const LoginCard = styled(Card)({
    height: '450px',
    width: '750px',
    backgroundColor: 'white',
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
  backgroundColor: 'lightgreen',
})


const Login = () => {
    return(
        <PageWrapper>
            <LoginCard 
              elevation={5}
            >
                <LoginCardLeft >
                    <TextField
                        label='Username'
                        id="username"
                    />
                    <TextField
                        label='Password'
                        id="password"
                    />
                    <Button variant="contained">
                        Login
                    </Button>
                </LoginCardLeft>
                <LoginCardRight>
                  <Image 
                    
                    // src='https://images.pexels.com/photos/16606649/pexels-photo-16606649/free-photo-of-green-leaves-of-eucalyptus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                    src='/plants.jpg'
                    alt="background"
                    width={750/2}
                    height={450}
                  />
                </LoginCardRight>
            </LoginCard>
        </PageWrapper>
    )
}

export default Login