import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Image, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const PROOF_TYPES = ['Loan Payment', 'Credit Card Payment', 'Other'];

export default function FinancialProofScreen() {
  const [type, setType] = useState(PROOF_TYPES[0]);
  const [amount, setAmount] = useState('');
  const [payDate, setPayDate] = useState(new Date());
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

  const onSubmit = () => {
    if (!proof || !payDate) {
      Alert.alert('กรุณากรอกข้อมูลและอัปโหลดเอกสารให้ครบถ้วน');
      return;
    }
    Alert.alert('สำเร็จ', '+2 Trust Points ได้รับสำหรับการอัปโหลดหลักฐานวินัยทางการเงิน');
    setAmount('');
    setProof(null);
    setPayDate(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Financial Discipline Proof</Text>
      <Text>Type of Proof</Text>
      <View style={styles.row}>
        {PROOF_TYPES.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, type === t && styles.typeBtnSelected]}
            onPress={() => setType(t)}
          >
            <Text style={{ color: type === t ? '#fff' : '#f60' }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Amount Paid (optional)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.00"
        value={amount}
        onChangeText={setAmount}
      />
      <Text>Date of Payment (optional)</Text>
      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.input}>
        <Text>{payDate ? payDate.toLocaleDateString() : 'DD/MM/YYYY'}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={payDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDate(false);
            if (date) setPayDate(date);
          }}
        />
      )}
      <Text>Upload Proof</Text>
      <Button title="Upload Photo or File" onPress={pickImage} />
      {proof && <Image source={{ uri: proof }} style={styles.preview} />}
      <TouchableOpacity style={styles.confirmBtn} onPress={onSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit Financial Proof</Text>
      </TouchableOpacity>
      <Text style={{ color: '#888', marginTop: 8 }}>
        +2 Trust Points for each verified upload
      </Text>
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
});
