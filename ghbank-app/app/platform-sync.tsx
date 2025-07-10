import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const platforms = [
  {
    key: 'grab',
    name: 'Grab Driver',
    icon: '🚗',
    summary: { today: 460, yesterday: 920, month: 19600 }
  },
  {
    key: 'lineman',
    name: 'Lineman Rider',
    icon: '🛵',
    summary: { today: 380, yesterday: 800, month: 15500 }
  }
];

export default function PlatformSyncScreen() {
  const [selected, setSelected] = useState(platforms[0].key);
  // เริ่มต้นเป็น object ว่าง (ไม่มีการเชื่อมต่อ)
  const [connected, setConnected] = useState({});
  const [lastSynced, setLastSynced] = useState('June 8, 2025 – 9:35 PM');

  const handleConnect = (key) => {
    const isCurrentlyConnected = connected[key];
    
    if (isCurrentlyConnected) {
      // ถ้าเชื่อมต่ออยู่แล้ว ให้แสดง confirmation dialog
      Alert.alert(
        'Disconnect Platform',
        `Are you sure you want to disconnect from ${platforms.find(p => p.key === key).name}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Disconnect',
            style: 'destructive',
            onPress: () => {
              setConnected({ ...connected, [key]: false });
              Alert.alert('Disconnected!', `Platform ${platforms.find(p => p.key === key).name} has been disconnected.`);
            },
          },
        ]
      );
    } else {
      // ถ้ายังไม่เชื่อมต่อ ให้เชื่อมต่อเลย
      setConnected({ ...connected, [key]: true });
      Alert.alert('Connected!', `Platform ${platforms.find(p => p.key === key).name} is now connected.`);
    }
  };

  const platform = platforms.find(p => p.key === selected);
  const isConnected = connected[selected];

  // กำหนดข้อความปุ่มตามสถานะ
  const getButtonText = () => {
    if (isConnected === undefined || isConnected === false) {
      return 'Connect';
    }
    return 'Connected';
  };

  const getButtonStyle = () => {
    if (isConnected === undefined || isConnected === false) {
      return styles.connectBtn;
    }
    return styles.connected;
  };

  const getButtonTextColor = () => {
    if (isConnected === undefined || isConnected === false) {
      return '#f60';
    }
    return '#090';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>Connect to See Income Statement</Text>
        <Text style={styles.subHeader}>Platform Sync Page</Text>
      </View>
      
      <View style={styles.platformRow}>
        {platforms.map(p => (
          <TouchableOpacity
            key={p.key}
            style={[styles.platformBtn, selected === p.key && styles.platformBtnSelected]}
            onPress={() => setSelected(p.key)}
          >
            <Text style={{ fontSize: 18 }}>{p.icon}</Text>
            <Text style={{ marginLeft: 6, color: selected === p.key ? '#f60' : '#333', fontWeight: selected === p.key ? 'bold' : 'normal' }}>
              {p.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.platformStatusRow}>
          <Text style={{ fontSize: 16 }}>{platform.icon} {platform.name}</Text>
          <TouchableOpacity
            style={[styles.statusBtn, getButtonStyle()]}
            onPress={() => handleConnect(platform.key)}
          >
            <Text style={{ color: getButtonTextColor() }}>
              {getButtonText()}
            </Text>
          </TouchableOpacity>
        </View>

        {isConnected && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Your {platform.name} Income Summary</Text>
            <View style={styles.summaryRow}>
              <Text>Today</Text>
              <Text style={styles.amount}>฿{platform.summary.today.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Yesterday</Text>
              <Text style={styles.amount}>฿{platform.summary.yesterday.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>This Month</Text>
              <Text style={styles.amount}>฿{platform.summary.month.toLocaleString()}</Text>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={{ color: '#f60' }}>View Detailed Statement</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={{ color: '#f60' }}>Select Date Range</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.syncTime}>Last synced: {lastSynced}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 0 },
  headerBox: { backgroundColor: '#f60', paddingTop: 36, paddingBottom: 18, paddingHorizontal: 18 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  subHeader: { color: '#fff', fontSize: 14 },
  platformRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 12 },
  platformBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f60', borderRadius: 12, padding: 8, marginHorizontal: 6, backgroundColor: '#fff' },
  platformBtnSelected: { backgroundColor: '#fff4e6', borderColor: '#f60' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginHorizontal: 18, marginTop: 8 },
  platformStatusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusBtn: { paddingVertical: 5, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1 },
  connected: { borderColor: '#090', backgroundColor: '#e6ffe6' },
  connectBtn: { borderColor: '#f60', backgroundColor: '#fff6ee' },
  summaryBox: { marginTop: 16 },
  summaryTitle: { fontWeight: 'bold', marginBottom: 10, color: '#333' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  amount: { color: '#f60', fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', marginTop: 12 },
  actionBtn: { borderWidth: 1, borderColor: '#f60', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12, marginRight: 8, backgroundColor: '#fff4e6' },
  syncTime: { color: '#888', fontSize: 12, marginTop: 10 },
});
