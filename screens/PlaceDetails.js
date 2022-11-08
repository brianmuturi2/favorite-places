import {ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import {Colors} from '../constants/colors';
import {useEffect, useState} from 'react';
import {fetchPlaceDetails} from '../util/database';

function PlaceDetails({route, navigation}) {

    const [place, setPlace] = useState();
    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function getPlace() {
            const placeRes = await fetchPlaceDetails(selectedPlaceId);
            setPlace(placeRes);
            navigation.setOptions({
                title: placeRes.title
            })
        }
        getPlace();
    }, [selectedPlaceId]);

    function showOnMapHandler() {
        navigation.navigate('Map', {
            lat: place.location.lat,
            lng: place.location.lng
        });
    }

    if (!place) {
        return (
            <View style={styles.fallback}>
                <Text>Loading Place...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: place.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
                <OutlinedButton icon={'map'} onPress={showOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,

    }
})
