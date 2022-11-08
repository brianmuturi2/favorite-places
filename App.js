import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import AllPlaces from './screens/AllPlaces';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import {Colors} from './constants/colors';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

import Map from './screens/Map';
import {initDB} from './util/database';
import {useCallback, useEffect, useState} from 'react';
import PlaceDetails from './screens/PlaceDetails';

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        initDB().then(() => {
            setAppIsReady(true)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <>
            <StatusBar style={'dark'}/>
            <NavigationContainer onReady={onLayoutRootView}>
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary500
                    },
                    headerTintColor: Colors.gray700,
                    contentStyle: {
                        backgroundColor: Colors.gray700
                    }
                }}>
                    <Stack.Screen
                        name={'All Places'}
                        component={AllPlaces}
                        options={({navigation}) => ({
                            title: 'Your Favorite Places',
                            headerRight: ({tintColor}) => (
                                <IconButton
                                    icon={'add'}
                                    size={24}
                                    color={tintColor}
                                    onPress={() => navigation.navigate('Add Place')}
                                />)
                        })}
                    />
                    <Stack.Screen
                        name={'Add Place'}
                        component={AddPlace}
                        options={{
                            title: 'Add a new place'
                        }}/>
                    <Stack.Screen
                        name={'Map'}
                        component={Map}/>
                    <Stack.Screen
                        name={'Place Details'}
                        component={PlaceDetails}
                        options={{
                            title: 'Place Details'
                        }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
