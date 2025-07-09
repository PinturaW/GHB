import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TrustDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trust Dashboard and Personal Growth Report</Text>
      <View style={styles.circle}>
        <Text style={styles.score}>200 pts</Text>
        <Text style={styles.level}>Level 3 : 300</Text>
      </View>
      <Text style={styles.subHeader}>Recent Activities</Text>
      <View style={styles.activity}>
        <Text>June 11 — Income uploaded verified <Text style={{color:'#090'}}>+5 pts</Text></Text>
        <Text>June 10 — Skipped <Text style={{color:'#888'}}>+0 pts</Text></Text>
        <Text>June 9 — Platform synced GRAB <Text style={{color:'#090'}}>+10 pts</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#f60', marginBottom: 16 },
  circle: { alignItems: 'center', justifyContent: 'center', marginVertical: 24 },
  score: { fontSize: 32, fontWeight: 'bold', color: '#f60' },
  level: { fontSize: 16, color: '#888' },
  subHeader: { fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  activity: { backgroundColor: '#fff', padding: 12, borderRadius: 8 },
});
