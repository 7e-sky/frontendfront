import React, { useState } from "react";
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography,
  Hidden,
  Tooltip,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "app/auth/store/actions";
import { Link } from "react-router-dom";
import { URL_SITE } from "@fuse";

import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [userMenu, setUserMenu] = useState(null);
  const [userMenu2, setUserMenu2] = useState(null);
  const config = useSelector(({ fuse }) => fuse.settings.current.layout);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };
  const userMenuClick2 = (event) => {
    setUserMenu2(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };
  const userMenuClose2 = () => {
    setUserMenu2(null);
  };

  return (
    <React.Fragment>
      {/* ============= TOKENS FOURNISSEURS ============*/}
      {user.role === "ROLE_FOURNISSEUR" && config.style === "layout1" ? (
        !user.requestJeton ? (
          <div
            className={clsx(
              "flex items-center px-8 py-4 mr-8 rounded-sm",
              !user.jetons ? "bg-red text-white" : "bg-green text-white"
            )}
          >
            <Tooltip title="Les jetons vous donnent accès au profil de l'acheteur ciblé (Après avoir consulté sa demande d'achat).">
              <Icon className="text-20 mr-4">info</Icon>
            </Tooltip>
            <Hidden only={["xs"]}>
              {" "}
              <span>Actuellement vous avez</span>
            </Hidden>
            &ensp;
            <b className="text-20">{user.jetons}</b> &ensp;
            <Hidden only={["xs"]}>
              {" "}
              <span>Jeton(s).</span>
            </Hidden>
            <Link
              to="/abonnement/commandes/true"
              className="ml-2 text-blue  font-bold  uppercase"
            >
              Charger
            </Link>
          </div>
        ) : (
          <div className="flex  items-center px-8 py-4 mr-8 ">
            <CircularProgress color="secondary" />
          </div>
        )
      ) : (
        ""
      )}
      {/* ============= FIN TOKENS FOURNISSEURS ============*/}
      {!user.role || user.role.length === 0 ? (
        <div className="flex items-center mr-2">
          <Button
            component={Link}
            to="/login"
            size="small"
            className="mr-2 h-40"
          >
            se connecter
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            className=" h-40"
            onClick={userMenuClick2}
          >
            Inscrivez-vous
          </Button>
          <Popover
            open={Boolean(userMenu2)}
            anchorEl={userMenu2}
            onClose={userMenuClose2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            classes={{
              paper: "py-8",
            }}
          >
            <React.Fragment>
              <MenuItem component={Link} to="/register/2">
                <ListItemText className="pl-0" primary="Acheteur" />
              </MenuItem>
              <MenuItem component={Link} to="/register/1">
                <ListItemText className="pl-0" primary="Fournisseur" />
              </MenuItem>
            </React.Fragment>
          </Popover>
        </div>
      ) : (
        <>
          <Button className="h-64" onClick={userMenuClick}>
            {user.data.photoURL ? (
              <Avatar
                className=""
                alt="user photo"
                src={URL_SITE + user.data.photoURL}
              />
            ) : (
              <Avatar className="">
                <Icon>account_circle</Icon>
              </Avatar>
            )}

            <div className="hidden md:flex flex-col ml-12 items-start">
              <Typography
                component="span"
                className="normal-case font-600 flex"
              >
                {user.data.displayName}
              </Typography>
              <Typography className="text-11 capitalize" color="textSecondary">
                {(user.role.toString() === "ROLE_FOURNISSEUR_PRE" ||
                  user.role.toString() === "ROLE_FOURNISSEUR") &&
                  "FOURNISSEUR"}
                {(user.role.toString() === "ROLE_ACHETEUR_PRE" ||
                  user.role.toString() === "ROLE_ACHETEUR") &&
                  "ACHETEUR"}
                {(user.role.toString() === "ROLE_ADMIN" ||
                  user.role.toString() === "ROLE_ADMIN") &&
                  "ADMINISTRATEUR"}
              </Typography>
            </div>
            <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
              keyboard_arrow_down
            </Icon>
          </Button>

          <Popover
            open={Boolean(userMenu)}
            anchorEl={userMenu}
            onClose={userMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            classes={{
              paper: "py-8",
            }}
          >
            <React.Fragment>
              {user.role.toString() !== "ROLE_FOURNISSEUR_PRE" &&
                user.role.toString() !== "ROLE_ACHETEUR_PRE" && (
                  <MenuItem component={Link} to="/dashboard">
                    <ListItemIcon className="min-w-40">
                      <Icon>dashboard</Icon>
                    </ListItemIcon>
                    <ListItemText className="pl-0" primary="Tableau de bord" />
                  </MenuItem>
                )}

              <MenuItem
                onClick={() => {
                  dispatch(authActions.logoutUser());
                  userMenuClose();
                }}
              >
                <ListItemIcon className="min-w-40">
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Déconnexion" />
              </MenuItem>
            </React.Fragment>
          </Popover>
        </>
      )}
    </React.Fragment>
  );
}

export default UserMenu;
