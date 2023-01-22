import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Habit } from '../screens/Habit';
import { Home } from '../screens/Home';
import { New } from '../screens/New';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        component={Home}
        name="home"
      />

      <Screen
        component={New}
        name="new"
      />

      <Screen
        component={Habit}
        name="habit"
      />

    </Navigator>
  )
}
