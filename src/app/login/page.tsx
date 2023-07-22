'use client';
import { Button, Card, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Image from 'next/image'
import { useRouter } from "next/navigation";

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
})

const StyledButton = styled(Button)({
  backgroundColor: '#E96A6A',
  borderColor: '#E96A6A',
})


const Login = () => {

  // creating login button
  const router = useRouter();
  const login = () =>{
    // oauth check would happen here
    router.push('home');
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
                    />
                    <TextField
                        label='Password'
                        id="password"
                    />
                    <StyledButton 
                      variant="contained"
                      onClick={login}
                    >
                        Login
                    </StyledButton>
                </LoginCardLeft>
                <LoginCardRight>
                  {/* <Image 
                    
                    // src='https://images.pexels.com/photos/16606649/pexels-photo-16606649/free-photo-of-green-leaves-of-eucalyptus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                    src='/plants.jpg'
                    alt="background"
                    width={750/2}
                    height={450}
                  /> */}
                </LoginCardRight>
            </LoginCard>
        </PageWrapper>
    )
}

export default Login