import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './app/dashboard';
import ProfileScreen from './app/ProfileScreen';
import PlatformSyncScreen from './app/platform-sync';
import DailyIncomeScreen from './app/daily-income';
import SelfBusinessScreen from './app/self-business';
import MonthlyTrustTrackerScreen from './app/monthly-trust-tracker';
import UploadFormalDeptScreen from './app/upload-formal-dept';
import FinancialProofScreen from './app/financial-proof';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="PlatformSyncScreen" component={PlatformSyncScreen} />
        <Stack.Screen name="DailyIncomeScreen" component={DailyIncomeScreen} />
        <Stack.Screen name="SelfBusinessScreen" component={SelfBusinessScreen} />
        <Stack.Screen name="MonthlyTrustTrackerScreen" component={MonthlyTrustTrackerScreen} />
        <Stack.Screen name="UploadFormalDeptScreen" component={UploadFormalDeptScreen} />
        <Stack.Screen name="FinancialProofScreen" component={FinancialProofScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}