import  axios from 'axios';

const url ="https://public.opendatasoft.com/api/records/1.0/search/?dataset=mass-shootings-in-america&facet=city&facet=state&facet=shooter_sex&facet=shooter_race&facet=type_of_gun_general&facet=fate_of_shooter_at_the_scene&facet=shooter_s_cause_of_death&facet=school_related&facet=place_type&facet=relationship_to_incident_location&facet=targeted_victim_s_general&facet=possible_motive_general&facet=history_of_mental_illness_general&facet=military_experience"

const getData = async() =>{
    return await axios.get(url)
}

export default getData()