'use client';
import { Button } from "@mui/material";

const Dashboard = () => {

  const testFunction = () => {
    console.log('test function firing')
    async function fetchFunc() {
      const res = await fetch ('http://localhost:3000/dashboard/testapi');
      console.log(res)
    }

    fetchFunc();
  }


  return (
    <div>
      This is a test dashboard page




    <Button
      onClick={() => testFunction()}
      variant='contained'
    >
      Test
    </Button>

    </div>
    
  )
}

export default Dashboard;