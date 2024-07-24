'use client';
import AppContext from "@/components/ContextProvider";
import { TextField } from "@mui/material";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { handleLogIn, loadUsers } from "@/utils/functions";
import {
  PageWrapper,
  LoginCard,
  LoginCardLeft,
  LoginCardRight,
  StyledButton
} from "@/utils/styles/login.styles"; // Update the import

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const appContext = useContext(AppContext);
  const { handleUserLogIn } = appContext;

  const router = useRouter();

  useEffect(() => {
    async function fetchAndSetUsers() {
      const data = await loadUsers();
      setUsers(data);
    }

    fetchAndSetUsers();
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
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            label='Password'
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <StyledButton
            variant="contained"
            onClick={() => handleLogIn(username, password, users, handleUserLogIn, router)}
          >
            Login
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => router.push('/create')}
          >
            Create Account
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
