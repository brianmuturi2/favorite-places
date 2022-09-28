import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import AllPlaces from './screens/AllPlaces';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import {Colors} from './constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style={'dark '}/>
            <NavigationContainer>
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
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
