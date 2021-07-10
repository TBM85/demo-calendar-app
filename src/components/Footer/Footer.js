import React from 'react';

import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <span>© Copyright 2021. <strong>"TBM85"</strong></span>
      <span> All rights reserved</span> 
    </footer>
  );
};

export default Footer;