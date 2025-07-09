import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DailyIncomeScreen() {
  const [incomePhoto, setIncomePhoto] = useState(null);
  const [income, setIncome] = useState('');
  const [diary, setDiary] = useState([
    { date: 'June 10', value: '฿820', uploaded: true },
    { date: 'June 9', value: '฿920', uploaded: true },
    { date: 'June 8', value: '฿500', uploaded: true },
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setIncomePhoto(result.assets[0].uri);
    }
  };

  const onAddIncome = () => {
    if (!incomePhoto) {
      Alert.alert('กรุณาอัปโหลดไฟล์หลักฐานรายได้');
      return;
    }
    setDiary([{ date: 'June 11', value: `฿${income || '0'}`, uploaded: true }, ...diary]);
    setIncome('');
    setIncomePhoto(null);
    Alert.alert('สำเร็จ', '+2 Trust Points earned today!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Upload Daily Income Diary</Text>
      <Text>Today's Date: Tuesday, 11 June 2025</Text>
      <Text style={{ marginTop: 12 }}>Upload today's income proof</Text>
      <Button title="Upload Photo or File" onPress={pickImage} />
      {incomePhoto && <Image source={{ uri: incomePhoto }} style={styles.preview} />}

      <Text>Total Income (Optional)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.00"
        value={income}
        onChangeText={setIncome}
      />

      <Button title="Add Daily Income" color="#f60" onPress={onAddIncome} />

      <Text style={{ marginTop: 16 }}>Progress toward IRS Score</Text>
      <View style={{ height: 8, backgroundColor: '#eee', borderRadius: 4, marginVertical: 8 }}>
        <View style={{ width: '40%', height: 8, backgroundColor: '#f60', borderRadius: 4 }} />
      </View>

      <Text>Diary Summary</Text>
      {diary.map((item, idx) => (
        <View key={idx} style={styles.diaryRow}>
          <Text>{item.date} — {item.value}</Text>
          <Text style={{ color: '#090' }}>{item.uploaded ? 'Uploaded' : 'Not Uploaded'}</Text>
        </View>
      ))}

      <Text style={{ marginTop: 16, color: '#f60' }}>
        Push Reminder: Don't forget to upload your statement to boost trust!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#f60', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginVertical: 8, backgroundColor: '#fff' },
  preview: { width: 100, height: 100, marginVertical: 8, borderRadius: 8 },
  diaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
});
