import PlaceForm from '../components/Places/PlaceForm';

function AddPlace({navigation}) {

    function createPlaceHandler(place) {
        navigation.navigate('All Places', {place})
    }

    return <PlaceForm onCreatePlace={createPlaceHandler}/>
}

export default AddPlace;
