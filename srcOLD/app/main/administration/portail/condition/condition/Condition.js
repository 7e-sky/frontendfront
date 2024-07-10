import React, { useEffect, useState, useRef } from 'react';
import { Button, Tab, Tabs, Icon, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, TextFieldFormsy } from '@fuse';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import _ from '@lodash';
import Formsy from 'formsy-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

}));

function Condition(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const condition = useSelector(({ conditionsApp }) => conditionsApp.condition);
    const formRef = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const { form, handleChange, setForm } = useForm(null);

    useEffect(() => {
        function updateConditionstate() {
            const params = props.match.params;
            const { conditionId } = params;

            if (conditionId === 'new') {
                dispatch(Actions.newCondition());
            }
            else {
                dispatch(Actions.getCondition(conditionId));

            }
        }

        updateConditionstate();
        return () => {
            dispatch(Actions.cleanUp())
        }

    }, [dispatch, props.match.params]);


    //SET ERRORS IN INPUTS AFTER ERROR API
    useEffect(() => {
        if (condition.error && tabValue === 0 && (condition.error.titre || condition.error.reponse)) {
            formRef.current.updateInputsWithError({
                ...condition.error
            });
        }
    }, [condition.error]);

    //SET FORM DATA
    useEffect(() => {
        if (
            (condition.data && !form) ||
            (condition.data && form && condition.data.id !== form.id)
        ) {

            setForm({ ...condition.data });
        }

    }, [form, condition.data, setForm]);


    function handleSubmit(model) {

        const params = props.match.params;
        const { conditionId } = params;
        if (conditionId === 'new') {
            dispatch(Actions.saveCondition(form, props.history));
        }
        else {

            dispatch(Actions.updateCondition(form, props.history));
        }
        //  dispatch(Actions.updateUserInfo(model, form.id));
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={

                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/admin/conditions" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Conditions
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">


                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.titre ? form.titre : 'Nouveau Condition'}

                                        </Typography>
                                    </FuseAnimate>

                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>


                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={condition.loading || !form.titre || !form.contenu}
                                onClick={() => handleSubmit(form)}
                            >
                                Sauvegarder
                                    {condition.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Button>
                        </FuseAnimate>

                    </div>
                )
            }
            contentToolbar={

                form && (
                    <Tabs
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64 normal-case" label="Infos condition" />
                    </Tabs>)

            }
            content={
                condition.requestCondition ? <LinearProgress color="secondary" /> :
                    form && (
                        <div className=" sm:p-10 max-w-2xl">

                            {tabValue === 0 && (
                                <Formsy
                                    ref={formRef}
                                    className="flex pt-5 flex-col ">
                                    <Grid container spacing={2} >

                                        <Grid item xs={12} sm={12}>
                                            <TextFieldFormsy
                                                className="mb-16"
                                                type="text"
                                                name="titre"
                                                value={form.titre}
                                                onChange={handleChange}
                                                label="Titre"
                                                validations={{
                                                    minLength: 4
                                                }}
                                                validationErrors={{
                                                    minLength: 'La longueur minimale de caractère est 4'
                                                }}
                                                variant="outlined"
                                                required
                                                fullWidth
                                            />
                                        </Grid>

                                    </Grid>


                                    <Grid container spacing={3}>


                                        <Grid item xs={12} sm={12}>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={form.contenu}
                                                config={{
                                                    language: 'fr',
                                                }}
                                                onInit={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setForm(_.set({ ...form }, 'contenu', data))
                                                }}
                                                onBlur={editor => {
                                                    console.log('Blur.', editor);
                                                }}
                                            />
                                            {
                                                condition.error && condition.error.contenu ? <span className='text-red'> {condition.error.contenu}</span> : ''
                                            }
                                        </Grid>
                                    </Grid>

                                </Formsy>
                            )}




                        </div>
                    )

            }
            innerScroll
        />
    )
}

export default withReducer('conditionsApp', reducer)(Condition);
