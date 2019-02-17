import React from "react";

import {Grid} from "@material-ui/core";
import UserCard from '../components/UserCard'

const CardContainer = (props) => {
    const {array} = props;
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <Grid container justify="space-evenly">
                    {array.map((item) => {
                        return (
                            <UserCard
                            key={item.id}
                            title={item.title}
                            user={item.user}/>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default CardContainer;
