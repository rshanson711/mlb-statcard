import React, {useState} from 'react';

export default async function PlayerSearchNew(props) {
    //const data = await fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + props.name + "%25'");
    const data = await fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='judge%25'");
    //get player image

    let playerData;
    const [name, setName] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [college, setCollege] = useState(null);
    
    //CONVERT DATA TO JSON
    try {
        playerData = await data.json();
    } catch {
        console.log("Failed to read var: playerData");
    }

    setName(playerData.search_player_all.queryResults.row.name_use + " " + playerData.search_player_all.queryResults.row.name_last);
    setOrigin(playerData.search_player_all.queryResults.row.birth_city + ", " + playerData.search_player_all.queryResults.row.birth_state);
    setCollege(playerData.search_player_all.queryResults.row.college);

    console.log("hello");
    return (
        <div className='playerContainer'>
            <h1>{name}</h1>
            <p>Birthplace: {origin}</p>
            <p>College: {college}</p>
        </div>
    )
}