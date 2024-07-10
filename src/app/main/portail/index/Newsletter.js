import React from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { Grid, Button, Icon, Paper } from '@material-ui/core';


const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
        });

    return (
        <div
            style={{
                display: "inline-block",
                width: '100%',
            }}
        >
            {status === "sending" && <div style={{ color: "blue" }}>Envoi en cours...</div>}
            {status === "error" && (
                <div
                    style={{ color: "red" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    style={{ color: "green" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            <Grid container spacing={2}>
                <Grid item sm={8}>
                    <Paper className="flex p-4 items-center mx-auto w-full max-w-640 " elevation={1}>

                        <Icon className="mr-8 ml-8" color="action">mail_outline</Icon>

                        <input
                            className="h-28 w-full"
                            ref={node => (email = node)}
                            type="email"
                            placeholder="exemple@exemple.com"
                        />

                    </Paper>

                </Grid>
                <Grid item sm={4}>
                    <Button className="whitespace-no-wrap" color="secondary" onClick={submit} variant="contained">
                        Soumettre
                    </Button>

                </Grid>
            </Grid>

        </div>
    );
};

// use the render prop and your custom form
export default function Newsletter(props) {
    const url = "https://lesachatsindustriels.us4.list-manage.com/subscribe/post?u=f32aaf1c3e01b891b2db4b37a&amp;id=fee05cc375";

    return (
        <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => (
                <CustomForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                />
            )}
        />
    )
}

