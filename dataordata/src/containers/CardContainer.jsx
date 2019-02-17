import React from "react";

import {Grid} from "@material-ui/core";
import UserCard from '../components/UserCard'

const CardContainer = (props) => {
    const {array, user} = props;
    console.log('array:', array)
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <Grid container justify="space-evenly">
                    {array.map((item) => {
                        console.log(item.id);
                        return (
                            <UserCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            user={item.user}
                            dude={user}/>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default CardContainer;
