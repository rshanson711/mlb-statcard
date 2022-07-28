import React, {Component} from 'react';

class PlayerSearch extends Component {
    constructor(props) {
        super(props);

        this.fetchPlayer = this.fetchPlayer.bind(this);

        this.state = {
            playerData: null,
            playerImage: null,
            firstName: null,
            lastName: null,
            originCity: null,
            originState: null,
            college: null
        }
    }

    async fetchPlayer(props) {
        const {name} = props;
        const data = await fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + name + "%25'");
        //const data = await fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='judge%25'");
        //get player image

        //CONVERT DATA TO JSON
        try {
            this.setState({
                playerData: await data.json()
            });
        } catch {
            console.log("Failed to read var: playerData");
        }
        
        //INITIALIZE STATES
        try {
            if (this.state.playerData.search_player_all.queryResults.totalSize === "1") {
               this.setState({
                    //playerImage: playerImgLink
                    firstName: this.state.playerData.search_player_all.queryResults.row.name_use,
                    lastName: this.state.playerData.search_player_all.queryResults.row.name_last,
                    originCity: this.state.playerData.search_player_all.queryResults.row.birth_city,
                    college: this.state.playerData.search_player_all.queryResults.row.college
                }); 

                if (this.state.playerData.search_player_all.queryResults.row.birth_country === "USA") {
                    this.setState({
                        originState: this.state.playerData.search_player_all.queryResults.row.birth_state
                    });
                } else {
                    this.setState({
                        originState: this.state.playerData.search_player_all.queryResults.row.birth_country
                    });
                }
            } else {
                //INITIALIZE FIRST/LAST NAME, BIRTH CITY, COLLEGE
                this.setState({
                    //playerImage: playerImgLink
                    firstName: this.state.playerData.search_player_all.queryResults.row[0].name_use,
                    lastName: this.state.playerData.search_player_all.queryResults.row[0].name_last,
                    originCity: this.state.playerData.search_player_all.queryResults.row[0].birth_city,
                    college: this.state.playerData.search_player_all.queryResults.row[0].college
                });

                //INITIALIZE STATE (OR COUNTRY) OF BIRTH
                if (this.state.playerData.search_player_all.queryResults.row[0].birth_country === "USA") {
                    this.setState({
                        originState: this.state.playerData.search_player_all.queryResults.row[0].birth_state
                    });
                } else {
                    this.setState({
                        originState: this.state.playerData.search_player_all.queryResults.row[0].birth_country
                    });
                }
            }
            
        } catch {
            console.log("Failed to parse var: playerData");
        }
    }

    render() {
        this.fetchPlayer(this.props);
        const {firstName, lastName, originCity, originState, college} = this.state;
        return (
            <div className='playerContainer'>
                <h1>{firstName} {lastName}</h1>
                <p>Birthplace: {originCity}, {originState}</p>
                <p>College: {college}</p>
            </div>
        )
    }
}

export default PlayerSearch;