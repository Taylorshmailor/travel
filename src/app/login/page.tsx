'use client';
import AppContext from "@/components/ContextProvider";
import { Button, Card, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { fetchUsers } from "@/utils/api";
import { User } from "@/types";

const PageWrapper = styled('div')({
  height: '100vh',
  width: '100%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const LoginCard = styled(Card)({
  height: '450px',
  width: '750px',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  borderRadius: '10px',
});

const LoginCardLeft = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'Center',
  rowGap: '10px'
});

const LoginCardRight = styled('div')({
  height: '100%',
  width: '100%',
  backgroundColor: '#F6F4EE',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'Center',
});

const StyledButton = styled(Button)({
  backgroundColor: '#E96A6A',
  borderColor: '#E96A6A',
});

const Login = () => {
  const [newUserName, setNewUserName] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const appContext = useContext(AppContext);
  const { handleUserLogIn } = appContext;

  const router = useRouter();
  const handleLogIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (newUserName.length > 0) {
      handleUserLogIn(newUserName);
      router.push('/home');
    }
  };

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    loadUsers();
  }, []);

  return (
    <PageWrapper>
      <div>
        <h1>Users</h1>
        <ul>
          {users.length > 0 ? (
            users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))
          ) : (
            <p>No users found</p>
          )}
        </ul>
      </div>
      <LoginCard elevation={5}>
        <LoginCardLeft>
          <TextField
            label='Username'
            id="username"
            value={newUserName}
            onChange={(event) => setNewUserName(event.target.value)}
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
  );
}

export default Login;
