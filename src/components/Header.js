import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const displayDesktop = () => {
    return <Toolbar>
      <NavLink exact activeClassName="active" to="/login">Log in</NavLink>
    </Toolbar>;
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}