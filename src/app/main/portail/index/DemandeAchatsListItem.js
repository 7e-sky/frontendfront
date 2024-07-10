import React from 'react';
import { IconButton, Icon, Typography, ListItem, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import _ from '@lodash';
import moment from 'moment';
import 'moment/locale/fr';
const useStyles = makeStyles({
    todoItem: {
        '&.completed': {
            background: 'rgba(0,0,0,0.03)',
            '& .todo-title, & .todo-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

function DemandeAchatsListItem(props) {
    const classes = useStyles(props);
    return (
        <ListItem
            className={clsx(classes.todoItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
            dense={true}
            component="a"
            href={`/demandes-achat/${props.demande.id}-${props.demande.slug}`}
            button
        >



            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="todo-title truncate font-600"
                    color={"inherit"}
                >
                    [ RFQ-{props.demande.reference} ] {props.demande.titre}
                </Typography>


                <Typography
                    color="textSecondary"
                    className="todo-notes truncate"
                >
                    {_.truncate(props.demande.description.replace(/<(?:.|\n)*?>/gm, ''), { 'length': 180 })}
                </Typography>

                <div className={clsx(classes.labels, "flex mt-8")}>
                    <Chip
                        icon={<Icon className="text-16 mr-0">location_on</Icon>}
                        label={props.demande.ville + ', ' + props.demande.pays}
                        classes={{
                            root: clsx("h-24"),
                            label: "pl-4 pr-6 py-4 text-11",
                        }}
                        className="mr-4"
                        color="secondary"
                    />
                    <Chip
                        icon={<Icon className="text-16 mr-0">access_time</Icon>}
                        label={moment(props.demande.created).fromNow()}
                        classes={{
                            root: clsx("h-24"),
                            label: "pl-4 pr-6 py-4 text-11",
                        }}
                        className="mr-4"
                        color="secondary"
                    />

                    <Chip
                        icon={<Icon className="text-16 mr-0">hourglass_empty</Icon>}
                        label={"Valable jusqu'au " + moment(props.demande.dateExpiration).format("DD-MM-YYYY à HH:mm")}
                        classes={{
                            root: clsx("h-24"),
                            label: "pl-4 pr-6 py-4 text-11",
                        }}
                        color="secondary"
                        className="mr-4"
                    />

                </div>
            </div>

            <div className="px-8">
                <IconButton >
                    <Icon>chevron_right</Icon>
                </IconButton>

            </div>
        </ListItem>
    );
}

export default DemandeAchatsListItem;
