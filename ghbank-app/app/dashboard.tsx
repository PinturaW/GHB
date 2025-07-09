import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const menu = [
  {
    section: 'Income Proof & Identity Validation',
    items: [
      { label: 'Platform Sync Engine', screen: 'platform-sync', icon: '🔄' },
      { label: 'Self-Business Verification', screen: 'self-business', icon: '🏪' },
      { label: 'Income Diary', screen: 'daily-income', icon: '📒' },
    ],
  },
  {
    section: 'Financial Behavior & Risk Profile',
    items: [
      { label: 'Monthly Trust Tracker', screen: 'monthly-trust-tracker', icon: '📅' },
      { label: 'Formal Debt Declaration', screen: 'upload-formal-debt', icon: '💳' },
      { label: 'Financial Discipline Proof', screen: 'financial-proof', icon: '📑' },
    ],
  },
  {
    section: 'Trust Score & Eligibility System',
    items: [
      { label: 'Income Reliability Score', screen: 'income-reliability', icon: '💰' },
      { label: 'Trust Dashboard and Report', screen: 'trust-dashboard', icon: '📊' },
      { label: 'Loan Simulation Tool', screen: 'loan-simulation', icon: '🧮' },
      { label: 'Eligibility Insight', screen: 'eligibility', icon: '🔍' },
    ],
  },
];

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFE9E0' }}>
      <View style={styles.headerBox}>
        <Text style={styles.headerLogo}>🏠</Text>
        <Text style={styles.headerTitle}>GHB BANK{"\n"}My First Home</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>GHB My First Home</Text>
        <Text style={styles.subtitle}>Welcome back, Wichuon</Text>
      </View>

      {menu.map((section, idx) => (
        <View key={section.section} style={styles.card}>
          <Text style={styles.section}>{section.section}</Text>
          <View style={styles.menuRow}>
            {section.items.map((item, i) => (
              <TouchableOpacity
                key={`${item.label}-${i}`}
                style={styles.menuItem}
                onPress={() => router.push(`/${item.screen}`)}
              >
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerBox: { backgroundColor: '#f60', paddingTop: 36, paddingBottom: 18, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center' },
  headerLogo: { fontSize: 36, color: '#fff', marginRight: 12 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', lineHeight: 22 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginHorizontal: 18, marginTop: 18 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#f60', marginBottom: 2 },
  subtitle: { color: '#333', marginBottom: 12 },
  section: { fontWeight: 'bold', color: '#222', marginBottom: 10, fontSize: 15 },
  menuRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  menuItem: { alignItems: 'center', width: '30%', margin: '1.66%' },
  iconCircle: { backgroundColor: '#FFF4E6', borderRadius: 40, width: 56, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  icon: { fontSize: 28, color: '#f60' },
  menuLabel: { textAlign: 'center', fontSize: 13, color: '#333', marginBottom: 4 },
});
