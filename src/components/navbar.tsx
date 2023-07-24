'use client';
import { useRouter } from "next/navigation";
import { Button, styled } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./ContextProvider";

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

const Navbar = () =>{
    const router = useRouter();

    const appContext = useContext(AppContext);
    const { userName, setUserName } = appContext;

    console.log(userName);

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
        setUserName('');
        router.push('login');
    }

    return (
        <Container>
            {
                userName ? 
                <NavBarWrapper>
                    <h2>Logo holder</h2>
                    <NavLinks>
                        <Button variant="contained" onClick={homeButton}>Home</Button>
                        <Button variant="contained" onClick={accountButton}>Account</Button>
                        <Button variant="contained" onClick={logoutButton}>Log Out</Button>
                    </NavLinks>     
                </NavBarWrapper>
            :
            <NoNavBar></NoNavBar>
            }
        </Container>
    )
}

export default Navbar