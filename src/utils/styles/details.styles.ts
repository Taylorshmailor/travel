// utils/styles/details.styles.ts
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import styled from '@emotion/styled';

export const ContentWrapper = styled('div') ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#F6F4EE',
  });
  export const StyledDialog = styled(Dialog) ({});
  export const StyledAppBar = styled(AppBar) ({ backgroundColor: 'darkolivegreen' });
  export const Embla = styled('div')({ overflow: 'hidden' });
  export const EmblaContainer = styled('div')({ display: 'flex', height: '400px', width: '100%' });
  export const EmblaSlide = styled('div')({ flex: '0 0 100%', minWidth: 0, height: '100%', width: '100%' });
  export const MyMap = styled('div')({ height: '70vh', width: '100%' });
  export const DayCard = styled('div')({ height: '600px', width: '300px', backgroundColor: 'White', borderRadius: '20px', marginTop: '15px', textAlign: 'center' });