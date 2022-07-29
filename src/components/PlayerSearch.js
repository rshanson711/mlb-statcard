import React, {useEffect, useState} from 'react';

export default function PlayerSearchNew(props) {
    const [playerData, setPlayerData] = useState(null);
    const [name, setName] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [college, setCollege] = useState(null);
    const [position, setPosition] = useState(null);
    const [battingHand, setBattingHand] = useState(null);
    const [throwingHand, setThrowingHand] = useState(null);

    function bornInUSA() {
        return (playerData.birth_country === "USA");
    }

    function hasCollege() {
        return (playerData.college != "");
    }

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

        //fetch("http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='judge%25'")
        //get player image 
    }, [props.name]);

    useEffect(() => {
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

    console.log("Line 31: playerData === " + playerData);
    return (
        <div className='playerContainer'>
            <h1>{name}</h1>
            <p>Position: {position}</p>
            <p>Bats: {battingHand} Throws: {throwingHand}</p>
            <p>Birthplace: {origin}</p>
            <p>College: {college}</p>
        </div>
    )
}