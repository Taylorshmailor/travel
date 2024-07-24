//src/components/navbar.tsx

'use client';
import { useRouter } from "next/navigation";
import { Button, styled, IconButton } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./ContextProvider";
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import logo from '../../public/map.png';
import Image from 'next/image'

const Container = styled('div')({
});

const NavBarWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2%',
    backgroundColor: '#F6F4EE'
});

const NavLinks = styled('div')({
    float: 'right',
});

const NoNavBar = styled('div')({
    display: 'flex',
    height: '0px',
    width: '100%',
});

const NavButton = styled(Button)({
    color: 'black',
    textTransform: 'none',
    fontSize: '1.2rem',
    fontWeight: '500',
    letterSpacing: '0',
})

const Navbar = () =>{
    const router = useRouter();

    const appContext = useContext(AppContext);
    const { username, handleLogOut } = appContext;

    console.log(username);

    // home button
    const homeButton = () =>{
        router.push('home');
    }
    // account button
    const accountButton = () =>{                          
        router.push('account');
    }
    // logout button
    const logoutButton = () =>{
        handleLogOut();
        router.push('login');
    }

    return (
        <Container>
            {
                username ? 
                <NavBarWrapper>
                    {/* <IconButton>
                        <FlutterDashIcon fontSize="large" style={{ color: 'darkolivegreen' }}/>
                    </IconButton> */}
                    <Image
                        src={logo}
                        alt="Website Logo"
                        width={100}
                        height={85}
                    />
                    <NavLinks>
                        <NavButton>Welcome {username}</NavButton>
                        <NavButton  onClick={homeButton}>Home</NavButton>
                        <NavButton  onClick={accountButton}>Account</NavButton>
                        <NavButton  onClick={logoutButton}>Log Out</NavButton>
                    </NavLinks>     
                </NavBarWrapper>
            :
            <NoNavBar></NoNavBar>
            }
        </Container>
    )
}

export default Navbar