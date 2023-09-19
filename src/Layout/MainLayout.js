import React from 'react';
import { Footer, Header, Nav} from '../Component/Template';

const MainLayout = ({ children, ...rest }) => {
  return (
    <>
    {children}
    </>
  )
}
export default MainLayout;  