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
            college: null
        }
    }

    async fetchPlayer(props) {
        const {name} = props;
        //const data = await fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part=" + name + "%25\"");
        const data = await fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='judge%25'");
        //get player image

        try {
            this.setState({
                playerData: await data.json()
            });
        } catch {
            console.log("Failed to read var: playerData");
        }
        
        try {
            this.setState({
                //playerImage: playerImgLink
                firstName: this.state.playerData.search_player_all.queryResults.row.name_use,
                lastName: this.state.playerData.search_player_all.queryResults.row.name_last,
                originCity: this.state.playerData.search_player_all.queryResults.row.high_school,
                college: this.state.playerData.search_player_all.queryResults.row.college
            });
        } catch {
            console.log("Failed to parse var: playerData");
        }
    }

    render() {
        this.fetchPlayer(this.props);

        const {firstName, lastName, originCity, college} = this.state;
        return (
            <div className='playerContainer'>
                <h1>{firstName} {lastName}</h1>
                <p>from {originCity}. Attended {college}.</p>
            </div>
        )
    }
}

export default PlayerSearch;