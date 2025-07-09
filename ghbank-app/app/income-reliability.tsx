import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IncomeReliabilityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>IRS: Income Reliability Score</Text>
      <Text>IRS Score Summary</Text>
      <View style={styles.bar}>
        <View style={styles.barFill} />
      </View>
      <Text style={styles.score}>IRS Score: 53 / 100</Text>
      <View style={styles.card}>
        <Text>IRS Score Breakdown</Text>
        <Text>Consistency +25 pts</Text>
        <Text>Source Reliability +15 pts</Text>
        <Text>Verification Rate -18 pts</Text>
        <Text>Missing Days -5 pts</Text>
      </View>
      <Text style={{marginTop:16}}>How to Improve</Text>
      <View style={styles.row}>
        <Text>Self-Business</Text>
        <Text>Income Diary</Text>
        <Text>Debt Declaration</Text>
        <Text>Discipline Proof</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#f60', marginBottom: 16 },
  bar: { height: 8, backgroundColor: '#eee', borderRadius: 4, marginVertical: 8, width: '100%' },
  barFill: { height: 8, width: '53%', backgroundColor: '#f60', borderRadius: 4 },
  score: { fontWeight: 'bold', marginVertical: 8 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});
