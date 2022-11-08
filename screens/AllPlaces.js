import PlacesList from '../components/Places/PlacesList';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {fetchPlaces} from '../util/database';

function AllPlaces({route}) {
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        async function getPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }
        if (isFocused) {
            getPlaces()
        }
    }, [isFocused]);

    return <PlacesList places={loadedPlaces}/>
}

export default AllPlaces;
