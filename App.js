import { StyleSheet, Image } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useCallback } from 'react';
import { Home } from './src/screens/Home';
import { Recherche } from './src/screens/Recherche';
import { Ajout } from './src/screens/Ajout';

const Home_screen = () => {
  const [refresh, setRefresh] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setRefresh(true);
      return () => setRefresh(false);
    }, []),
  );

  return <Home refresh={refresh} />;
};

const Recherche_screen = () => {
  return <Recherche />;
};

const Ajout_screen = () => {
  return <Ajout />;
};

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={Home_screen}
            options={{
              tabBarIcon: ({ color }) => (
                  <Image
                      source={require('./assets/home-icon.png')}
                      style={{ tintColor: color, width: 18, height: 18 }}
                  />
              ),
            }}
        />
        <Tab.Screen
            name="Search"
            component={Recherche_screen}
            options={{
              tabBarIcon: ({ color }) => (
                  <Image
                      source={require('./assets/search-icon.png')}
                      style={{ tintColor: color, width: 18, height: 18 }}
                  />
              ),
            }}
        />
        <Tab.Screen
            name="Add"
            component={Ajout_screen}
            options={{
              tabBarIcon: ({ color }) => (
                  <Image
                      source={require('./assets/add-icon.png')}
                      style={{ tintColor: color, width: 18, height: 18 }}
                  />
              ),
            }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
