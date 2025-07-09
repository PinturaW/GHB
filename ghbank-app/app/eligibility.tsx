import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function EligibilityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eligibility Checker</Text>
      <Text>See your chances of approval</Text>
      <View style={styles.card}>
        <Text>Estimated Monthly Repayment</Text>
        <Text style={styles.highlight}>฿6,700</Text>
        <Text>20 years</Text>
        <Text>Approval Likelihood</Text>
        <View style={styles.bar}><View style={styles.barFill}/></View>
      </View>
      <Text style={{marginVertical:12}}>Suggested GHB Programs</Text>
      <View style={styles.program}><Text>บ้านคนหลังน้อย</Text><Text style={styles.desc}>Low-income focused</Text></View>
      <View style={styles.program}><Text>บ้านผ่อนสบาย</Text><Text style={styles.desc}>Flexible payment plan</Text></View>
      <View style={styles.program}><Text>First Jobber Plan</Text><Text style={styles.desc}>Young adults</Text></View>
      <TouchableOpacity style={styles.button}>
        <Text style={{color:'#fff'}}>Continue to Contract Setup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#f60', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16 },
  highlight: { color: '#f60', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  bar: { height: 8, backgroundColor: '#eee', borderRadius: 4, marginVertical: 8, width: '100%' },
  barFill: { height: 8, width: '40%', backgroundColor: '#f60', borderRadius: 4 },
  program: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 },
  desc: { color: '#888', fontSize: 12 },
  button: { marginTop: 24, backgroundColor: '#f60', padding: 16, borderRadius: 8, alignItems: 'center' },
});
