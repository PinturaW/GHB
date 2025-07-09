import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoanSimulationScreen() {
  const router = useRouter();
  const [income, setIncome] = useState('20000');
  const [price, setPrice] = useState('1250000');
  const [years, setYears] = useState('20');
  const monthlyRepay = '6,700';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loan Simulation</Text>
      <Text>What can you afford?</Text>
      <Text>Your Monthly Income</Text>
      <TextInput style={styles.input} value={income} onChangeText={setIncome} keyboardType="numeric"/>
      <Text>Estimated Home Price</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric"/>
      <Text>Years to Repay</Text>
      <TextInput style={styles.input} value={years} onChangeText={setYears} keyboardType="numeric"/>
      <Text style={{marginTop:16}}>Estimated Monthly Repayment</Text>
      <Text style={styles.highlight}>฿{monthlyRepay}</Text>
      <Text>{years} years</Text>
      <Text>Approval Likelihood</Text>
      <View style={styles.bar}>
        <View style={styles.barFill} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/eligibility')}>
        <Text style={{color:'#fff'}}>Check Eligibility</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#f60', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginVertical: 8, backgroundColor: '#fff' },
  highlight: { color: '#f60', fontSize: 20, fontWeight: 'bold' },
  bar: { height: 8, backgroundColor: '#eee', borderRadius: 4, marginVertical: 8, width: '100%' },
  barFill: { height: 8, width: '40%', backgroundColor: '#f60', borderRadius: 4 },
  button: { marginTop: 24, backgroundColor: '#f60', padding: 16, borderRadius: 8, alignItems: 'center' },
});
