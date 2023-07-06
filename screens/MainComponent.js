
import { View, Platform } from 'react-native';
import Constants from 'expo-constants';
//import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import { createStackNavigator } from '@react-navigation/stack';

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#5637DD'
                },
                headerTintColor: '#fff'
            }} >
                <Stack.Screen
                    name='Directory'
                    component={DirectoryScreen}
                    options={{title: 'Campsite Directory'}}
                />
                <Stack.Screen
                    name='CampsiteInfo'
                    component={CampsiteInfoScreen}
                    options={({ route }) => ({
                        title: route.params.campsite.name
                    })} />
            </Stack.Navigator>
    )
}
const Main = () => {
    //const [ campsites, setCampsites] = useState(CAMPSITES);
   // const [selectedCampsiteId, setSelectedCampsiteId] = useState();

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          { /* <DirectoryScreen 
                campsites={campsites } 
                onPress={(campsiteId) => setSelectedCampsiteId(campsiteId)}
            />
            <CampsiteInfoScreen
                campsite={ campsites.filter((campsite) => campsite.id === selectedCampsiteId)[0]
                }  />*/}
                <DirectoryNavigator />
        </View>
    ) 

};

export default Main;