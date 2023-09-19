import React from 'react';  
import { Footer, Header,Nav ,Popup,BlockContact} from '../Component/Template';
  
const ChatLayout = ({children, ...rest}) => {  
  return (  
    <>
    {/* <Header />
    <Nav /> */}
    {children}
    {/* <Footer />
    <Popup/>
    <BlockContact/> */}
    </>
   
  )  
}  
export default ChatLayout;  