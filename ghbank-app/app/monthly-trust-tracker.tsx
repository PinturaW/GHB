import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function TrustScoreDonut({ percent }) {
  return (
    <View style={styles.donutContainer}>
      <View style={styles.donutBg} />
      <View style={[styles.donutFg, { transform: [{ rotate: `${percent * 1.8}deg` }] }]} />
      <View style={styles.donutInner}>
        <Text style={styles.donutPercent}>{percent}%</Text>
        <Text style={styles.donutActive}>Active</Text>
      </View>
    </View>
  );
}

export default function MonthlyTrustTrackerScreen() {
  const trustScore = 75;
  const trustPoints = 200;
  const achievements = [
    { name: 'Reliable Borrower', desc: '3 on-time months', icon: '🏆' },
    { name: 'Early Bird', desc: 'paid before deadline', icon: '⭐' }
  ];
  const alerts = [
    { msg: '10 days left before next due', action: 'Pay Now' }
  ];
  const calendar = [
    { date: 13, type: 'LATE' },
    { date: 15, type: 'PAID' },
    { date: 23, type: 'UPCOMING' },
    { date: 24, type: 'PAID' }
  ];

  const getMark = (day) => calendar.find(c => c.date === day);
  const weeks = [];
  for (let w = 0; w < 5; w++) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = w * 7 + i + 1;
      if (day > 30) days.push(null);
      else days.push(day);
    }
    weeks.push(days);
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.header}>Monthly Trust Tracker</Text>
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TrustScoreDonut percent={trustScore} />
          <View style={{ marginLeft: 24 }}>
            <Text style={styles.latestData}>Latest Data xx/xx/xxxx</Text>
            <Text style={styles.trustPoints}>{trustPoints}</Text>
            <Text style={styles.trustPointsLabel}>Trust Points</Text>
          </View>
        </View>
        <Text style={styles.earnTip}>Earn Trust Points by Paying on Time</Text>
      </View>
      
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Monthly Repayment</Text>
        <View style={styles.calendarBox}>
          <Text style={styles.calendarMonth}>April 2025</Text>
          <View style={styles.calendarRow}>
            {['S','M','T','W','T','F','S'].map((d, idx) => (
              <Text key={d + idx} style={styles.calendarHeader}>{d}</Text>
            ))}
          </View>
          {weeks.map((days, w) => (
            <View key={w} style={styles.calendarRow}>
              {days.map((day, i) => {
                if (!day) return <Text key={`empty-${w}-${i}`} style={styles.calendarCell}></Text>;
                const mark = getMark(day);
                let cellStyle = [styles.calendarCell];
                let markIcon = '';
                if (mark?.type === 'PAID') {
                  cellStyle.push({ backgroundColor: '#fff7e6', borderColor: '#ffe0b2', borderWidth: 1 });
                  markIcon = '✔️';
                }
                if (mark?.type === 'LATE') {
                  cellStyle.push({ backgroundColor: '#ffeaea', borderColor: '#ffbdbd', borderWidth: 1 });
                  markIcon = '⚠️';
                }
                if (mark?.type === 'UPCOMING') {
                  cellStyle.push({ backgroundColor: '#eef6ff', borderColor: '#b3d1ff', borderWidth: 1 });
                  markIcon = '🔔';
                }
                return (
                  <View key={`day-${w}-${i}`} style={cellStyle}>
                    <Text style={styles.calendarDayNum}>{day}</Text>
                    {markIcon ? <Text style={styles.calendarMark}>{markIcon}</Text> : null}
                  </View>
                );
              })}
            </View>
          ))}
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: '#fff7e6', borderColor: '#ffe0b2' }]} />
            <Text style={styles.legendLabel}>PAID</Text>
            <View style={[styles.legendDot, { backgroundColor: '#ffeaea', borderColor: '#ffbdbd' }]} />
            <Text style={styles.legendLabel}>LATE</Text>
            <View style={[styles.legendDot, { backgroundColor: '#eef6ff', borderColor: '#b3d1ff' }]} />
            <Text style={styles.legendLabel}>UPCOMING</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((a, i) => (
          <View key={i} style={styles.achieveRow}>
            <Text style={{ fontSize: 20 }}>{a.icon}</Text>
            <Text style={{ marginLeft: 8 }}>{a.name} <Text style={{ color: '#888', fontSize: 12 }}>({a.desc})</Text></Text>
          </View>
        ))}
      </View>
      
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Alerts & Reminders</Text>
        {alerts.map((a, i) => (
          <View key={i} style={styles.alertRow}>
            <Text>{a.msg}</Text>
            <Text style={styles.payNow}>{a.action}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF4F0' 
  },
  contentContainer: { 
    paddingBottom: 40,
    paddingTop: 0
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#f60', 
    marginVertical: 16, 
    marginHorizontal: 16 
  },
  box: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 18, 
    marginHorizontal: 12, 
    marginBottom: 16 
  },
  latestData: { color: '#888', fontSize: 12, marginBottom: 2 },
  trustPoints: { color: '#f60', fontWeight: 'bold', fontSize: 24, textAlign: 'left', marginBottom: 0, marginTop: 2 },
  trustPointsLabel: { color: '#f60', fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  earnTip: { color: '#888', fontSize: 13, marginTop: 10, textAlign: 'center' },
  sectionTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
  donutContainer: { width: 70, height: 70, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  donutBg: { position: 'absolute', width: 70, height: 70, borderRadius: 35, borderWidth: 8, borderColor: '#ffe0b2' },
  donutFg: { position: 'absolute', width: 70, height: 70, borderRadius: 35, borderLeftWidth: 8, borderColor: '#f60', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: 'transparent' },
  donutInner: { position: 'absolute', width: 70, height: 70, justifyContent: 'center', alignItems: 'center' },
  donutPercent: { fontSize: 16, fontWeight: 'bold', color: '#f60', lineHeight: 20 },
  donutActive: { fontSize: 11, color: '#f60' },
  calendarBox: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 12, marginTop: 8 },
  calendarMonth: { textAlign: 'center', marginBottom: 8, fontWeight: 'bold', fontSize: 15 },
  calendarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  calendarHeader: { width: 32, textAlign: 'center', color: '#888', fontWeight: 'bold', fontSize: 13 },
  calendarCell: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', margin: 1, backgroundColor: '#f9f9f9' },
  calendarDayNum: { fontSize: 14, color: '#333' },
  calendarMark: { fontSize: 13, marginTop: -2 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  legendDot: { width: 16, height: 16, borderRadius: 8, marginRight: 4, borderWidth: 1 },
  legendLabel: { marginRight: 16, fontSize: 12, color: '#888' },
  achieveRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  alertRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  payNow: { color: '#f60', fontWeight: 'bold' },
});
