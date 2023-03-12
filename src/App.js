import * as React from 'react';
import Footer from './component/copyrigh';
import Nav from './component/nav';
import Home from './screen/home'
export default function MyApp() {
  return (
    <div>
      <Nav/>
      <Home/>
      <Footer />
    </div>
  );
}