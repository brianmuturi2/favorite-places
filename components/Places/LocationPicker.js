import {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Image, Text} from 'react-native';
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location';

import OutlinedButton from '../UI/OutlinedButton';
import {Colors} from '../../constants/colors';
import {getAddress, getMapPreview} from '../../util/location';

import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';

function LocationPicker({onPickLocation}) {

    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = route.params && {...route.params.pickedLocation};
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address});
            }
        }

        handleLocation();
    }, [pickedLocation, onPickLocation ]);

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera permissions to use this app.'
            );
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
            //return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }
        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation){
        locationPreview = (<Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}/>);
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon={'location'} onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon={'map'} onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
});
