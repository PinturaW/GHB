import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

function BackButton() {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      onPress={() => router.push('/dashboard')}
      style={{ 
        backgroundColor: '#f60', 
        paddingHorizontal: 8, 
        paddingVertical: 6, 
        borderRadius: 6, 
        marginRight: 10,
        minWidth: 32,
        alignItems: 'center'
      }}
    >
      <Text style={{ color: '#fff', fontSize: 18 }}></Text>
    </TouchableOpacity>
  );
}


export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      headerStyle: { backgroundColor: '#f60' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerRight: () => <BackButton />
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="platform-sync" options={{ title: 'Platform Sync' }} />
      <Stack.Screen name="daily-income" options={{ title: 'Income Diary' }} />
      <Stack.Screen name="self-business" options={{ title: 'Self-Business' }} />
      <Stack.Screen name="monthly-trust-tracker" options={{ title: 'Trust Tracker' }} />
      <Stack.Screen name="upload-formal-debt" options={{ title: 'Formal Debt' }} />
      <Stack.Screen name="financial-proof" options={{ title: 'Financial Proof' }} />
      <Stack.Screen name="income-reliability" options={{ title: 'Income Score' }} />
      <Stack.Screen name="trust-dashboard" options={{ title: 'Trust Dashboard' }} />
      <Stack.Screen name="loan-simulation" options={{ title: 'Loan Simulation' }} />
      <Stack.Screen name="eligibility" options={{ title: 'Eligibility' }} />
    </Stack>
  );
}