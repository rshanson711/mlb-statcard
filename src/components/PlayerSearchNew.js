import React, {useEffect, useState} from 'react';

export default function PlayerSearchNew(props) {
    const [playerData, setPlayerData] = useState(null);
    const [name, setName] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [college, setCollege] = useState(null);

    useEffect(() => {
        fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + props.name + "%25'")
            .then(response => response.json())
            .then(data => setPlayerData(data));

        //fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='judge%25'")
        //get player image 
    }, [props.name]);

    useEffect(() => {
        if (playerData != null) {
            setName(playerData.search_player_all.queryResults.row.name_use + " " + playerData.search_player_all.queryResults.row.name_last);
            setOrigin(playerData.search_player_all.queryResults.row.birth_city + ", " + playerData.search_player_all.queryResults.row.birth_state);
            setCollege(playerData.search_player_all.queryResults.row.college);
        }
    }, [playerData]);

    console.log("Line 31: playerData === " + playerData);
    return (
        <div className='playerContainer'>
            <h1>{name}</h1>
            <p>Birthplace: {origin}</p>
            <p>College: {college}</p>
        </div>
    )
}