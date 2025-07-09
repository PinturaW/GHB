import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Image, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const DEBT_TYPES = ['Credit Card', 'Personal Loan', 'Car Loan', 'Mortgage', 'Other'];

export default function UploadFormalDebtScreen() {
  const [type, setType] = useState(DEBT_TYPES[0]);
  const [balance, setBalance] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [proof, setProof] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setProof(result.assets[0].uri);
    }
  };

  const onConfirm = () => {
    if (!balance || !proof || !dueDate) {
      Alert.alert('กรุณากรอกข้อมูลและอัปโหลดเอกสารให้ครบถ้วน');
      return;
    }
    Alert.alert('สำเร็จ', '+3 Trust Points ได้รับและบันทึกวันครบกำหนดในปฏิทินแล้ว');
    setBalance('');
    setProof(null);
    setDueDate(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Your Formal Debt</Text>
      <Text>Type of Debt</Text>
      <View style={styles.row}>
        {DEBT_TYPES.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, type === t && styles.typeBtnSelected]}
            onPress={() => setType(t)}
          >
            <Text style={{ color: type === t ? '#fff' : '#f60' }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Outstanding Balance</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.00"
        value={balance}
        onChangeText={setBalance}
      />
      <Text>Next Due Date</Text>
      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.input}>
        <Text>{dueDate ? dueDate.toLocaleDateString() : 'DD/MM/YYYY'}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDate(false);
            if (date) setDueDate(date);
          }}
        />
      )}
      <Text>Upload Proof</Text>
      <Button title="Upload Photo or File" onPress={pickImage} />
      {proof && <Image source={{ uri: proof }} style={styles.preview} />}
      <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add Formal Debt</Text>
      </TouchableOpacity>
      <View style={styles.pushReminder}>
        <Text>Push Reminder: You'll be notified monthly to update your debt status.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#f60', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginVertical: 8, backgroundColor: '#fff' },
  preview: { width: 100, height: 100, marginVertical: 8, borderRadius: 8 },
  confirmBtn: { backgroundColor: '#f60', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
  typeBtn: { borderWidth: 1, borderColor: '#f60', borderRadius: 16, padding: 8, marginRight: 8, marginBottom: 8 },
  typeBtnSelected: { backgroundColor: '#f60' },
  pushReminder: { backgroundColor: '#fffbe6', borderRadius: 8, padding: 12, marginTop: 16 },
});
