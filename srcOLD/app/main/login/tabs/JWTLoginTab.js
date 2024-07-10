import React, { useEffect, useRef, useState } from "react";
import { Button, InputAdornment, Icon, IconButton } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import * as authActions from "app/auth/store/actions";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
function JWTLoginTab(props) {
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  const classes = useStyles();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (login.error && login.error.message) {
      dispatch(
        Actions.showMessage({
          //message: login.error.message,//text or html
          message:
            login.error.message === "Invalid credentials."
              ? "Email ou mot de passe incorrect."
              : login.error.message,
          autoHideDuration: 6000, //ms
          anchorOrigin: {
            vertical: "top", //top bottom
            horizontal: "right", //left center right
          },
          variant: "error", //success error info warning null
        })
      );
    }
    enableButton();
  }, [dispatch, login.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.submitLogin(model));
    disableButton();
  }

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col justify-center w-full"
      >
        <TextFieldFormsy
          className="mb-16"
          type="email"
          name="email"
          label="Email"
          validations="isEmail"
          validationErrors={{
            isEmail: "L'adresse email n'est pas valide",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  email
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <TextFieldFormsy
          className="mb-16"
          type={values.showPassword ? "text" : "password"}
          name="password"
          label="Mot de passe"
          onChange={handleChange("password")}
          validations={{
            minLength: 6,
          }}
          validationErrors={{
            minLength: "La longueur minimale des caractères est de 6",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
        <Link className="font-medium text-blue" to="/forgot-password">
          Mot de passe oublié ?
        </Link>
        <Button
          type="submit"
          variant="contained"
          name="submit"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="LOG IN"
          disabled={!isFormValid || login.loading}
          value="legacy"
        >
          Connexion
          {login.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Formsy>
    </div>
  );
}

export default JWTLoginTab;
