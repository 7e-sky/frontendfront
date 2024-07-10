import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ContentLoader from "react-content-loader"
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { classes } from 'istanbul-lib-coverage';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },

    expanded: {},
})(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

function FaqDetail(props) {
    const faqs = useSelector(({ faqsApp }) => faqsApp.faqs);
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <Grid container className="max-w-2xl mx-auto py-48 sm:px-16 items-start">
            {
                faqs.loading ?
                    <Grid item xs={12} sm={12}>
                        <ContentLoader
                            speed={2}
                            width={480}
                            height={380}
                            viewBox="0 0 480 380"
                        >
                            <rect x="25" y="5" rx="0" ry="0" width="135" height="20" />
                            <rect x="25" y="42" rx="0" ry="0" width="426" height="43" />
                            <rect x="25" y="90" rx="0" ry="0" width="426" height="43" />
                            <rect x="25" y="197" rx="0" ry="0" width="426" height="43" />
                            <rect x="25" y="160" rx="0" ry="0" width="135" height="20" />
                            <rect x="25" y="245" rx="0" ry="0" width="426" height="43" />
                            <rect x="25" y="318" rx="0" ry="0" width="135" height="20" />
                            <rect x="25" y="353" rx="0" ry="0" width="426" height="43" />
                            <rect x="25" y="402" rx="0" ry="0" width="426" height="43" />
                        </ContentLoader>
                    </Grid>
                    :
                    (
                        faqs.data &&
                        faqs.data.map((categorie, index) => (
                            categorie.faqs && (
                                <div key={index} className="mb-16">
                                    <Typography variant="h6" className={clsx(classes.border, "mb-16")}>
                                        {categorie.name}
                                    </Typography>
                                    {
                                        categorie.faqs.map((faq, i) => (
                                            <ExpansionPanel key={i} square expanded={expanded === index + 'panel' + (i + 1)} onChange={handleChange(index + 'panel' + (i + 1))}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography>{faq.question}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography component="p" className="whitespace-pre-line">
                                                        {faq.reponse}
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        ))
                                    }
                                </div>)

                        ))
                    )
            }


        </Grid>
    );
}

export default React.memo(FaqDetail);
