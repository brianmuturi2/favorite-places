import PlaceForm from '../components/Places/PlaceForm';
import {insertPlace} from '../util/database';

function AddPlace({navigation}) {

    async function createPlaceHandler(place) {
        await insertPlace(place);
        navigation.navigate('All Places', {place})
    }

    return <PlaceForm onCreatePlace={createPlaceHandler}/>
}

export default AddPlace;
