import React, {useEffect, useState} from 'react';

export default function PlayerSearchNew(props) {
    const [playerData, setPlayerData] = useState(null);
    const [name, setName] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [college, setCollege] = useState(null);
    const [position, setPosition] = useState(null);
    const [battingHand, setBattingHand] = useState(null);
    const [throwingHand, setThrowingHand] = useState(null);

    
    useEffect(() => {
        fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + props.name + "%25'")
            .then(response => response.json())
            .then(data => {
                if (data.search_player_all.queryResults.totalSize === "1") {
                    setPlayerData(data.search_player_all.queryResults.row);
                } else {
                    setPlayerData(data.search_player_all.queryResults.row[0]);
                }
            });

        //get player image 
    }, [props.name]);

    useEffect(() => {
        function bornInUSA() {
            return (playerData.birth_country === "USA");
        }
    
        function hasCollege() {
            return (playerData.college !== "");
        }
    
        if (playerData) {
            setName(playerData.name_use + " " + playerData.name_last);

            //INITIALIZE PLACE OF BIRTH
            if (bornInUSA()) {
                setOrigin(playerData.birth_city + ", " + playerData.birth_state);
            } else {
                setOrigin(playerData.birth_city + ", " + playerData.birth_country);
            }

            //INITIALIZE PRIOR EDUCATION
            if (hasCollege()) {
                setCollege(playerData.college);
            } else {
                setCollege(playerData.high_school);
            }

            //INITIALIZE POSITION
            setPosition(playerData.position);

            //INITALIZE BATTING AND THROWING/PITCHING HAND
            setBattingHand(playerData.bats);
            setThrowingHand(playerData.throws)
        }
    }, [playerData]);

    return (
        <div className='playerContainer'>
            <h1 className='playerName'>{name}</h1>
            <p className='playerPos'>Position: {position}</p>
            <p className='playerBatsThrows'>Bats: {battingHand} Throws: {throwingHand}</p>
            <p className='playerBirthplace'>Birthplace: {origin}</p>
            <p className='playerCollege'>College: {college}</p>
        </div>
    )
}