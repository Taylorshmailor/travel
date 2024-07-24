// src/app/create/page.tsx
'use client';
import { Button, styled, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AppContext } from "@/components/ContextProvider"; // Make sure to use AppContext here
import Image from 'next/image';
import { handleAccountCreation } from "@/utils/functions";
import {
  PageWrapper,
  LoginCard,
  LoginCardLeft,
  LoginCardRight,
  StyledButton
} from "@/utils/styles/login.styles"; // Update the import

const Create = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const appContext = useContext(AppContext); // Get the context
  const { handleUserLogIn } = appContext; // Destructure handleUserLogIn from context

  return (
    <PageWrapper>
      <LoginCard elevation={5}>
        <LoginCardLeft>
          <TextField
            label='Username'
            id="newUsername"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
          />
          <TextField
            label='Email'
            id="newEmail"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
          <TextField
            label='Password'
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <StyledButton
            variant="contained"
            onClick={() => handleAccountCreation(newEmail, newUsername, newPassword, handleUserLogIn, router)} // Pass handleUserLogIn
          >
            Create
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

export default Create;
