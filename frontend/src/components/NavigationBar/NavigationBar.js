import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

// material ui
import { Popover, Typography, Container, AppBar, Toolbar } from "@material-ui/core";
import useStyles from "./styles";

// pictures
import logo from "../../img/logo-white.png";
import nzflag from "../../img/nz-flag.png";
import maoriflag from "../../img/maori-flag.png";
// import profilePhoto from "../../img/rawiri_profile.png";
import { signout } from "actions/userActions";

// TODO: handle user profile photo blob from SQL server

NavigationBar.propTypes = {
  modalClick: PropTypes.func,
};

export default function NavigationBar(props) {
  const classes = useStyles();

  const { modalClick } = props;
  const [anchor, setAnchor] = useState(null);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handlePopoverOpen = (e) => {
    setAnchor(e.currentTarget);
    console.log(open);
  };

  const handlePopoverClose = () => {
    setAnchor(null);
  };

  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signout());
  };
  // const open = Boolean(anchor);
  const open = Boolean(anchor);
  console.log(userInfo.ProfilePic);
  return (
    <AppBar
      color="primary"
      classes={{
        root: classes.appBarRoot,
      }}
      position="sticky"
    >
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <Toolbar className={`row ${classes.toolBar}`}>
        <Typography variant="h3">
          <Link to="/">Home</Link>
        </Typography>
        <Typography variant="h3">
          <Link to="/">Features</Link>
        </Typography>
        <Typography variant="h3">
          <Link to="/">Teachers</Link>
        </Typography>
      </Toolbar>
      <div className={classes.subControl}>
        <div className="row-end">
          <Typography variant="subtitle1">LANG</Typography>
          <img src={nzflag} alt="" />
          <img src={maoriflag} alt="" />
        </div>
        {userInfo ? (
          <Container
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <img
              className={classes.profilePhoto}
              src={`data:image/jpeg;base64,${userInfo.ProfilePic}`}
              alt=""
            />
            <span>{`${userInfo.FirstName} ${userInfo.LastName}`}</span>
            <Popover
              id="mouse-over-popover"
              open={open}
              anchorEl={anchor}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              disableRestoreFocus
            >
              <Typography variant="h4">My Profile</Typography>
              <Typography variant="h4">Settings</Typography>
              <Typography onClick={handleSignOut} variant="h4">
                Log out
              </Typography>
            </Popover>
          </Container>
        ) : (
          <div className="row">
            <Typography variant="h5" onClick={() => modalClick("Sign Up")}>
              Register
            </Typography>
            <span> | </span>
            <Typography variant="h5" onClick={() => modalClick("Login")}>
              Login
            </Typography>
          </div>
        )}
      </div>
    </AppBar>
  );
}
