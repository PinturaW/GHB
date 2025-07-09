import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Image, StyleSheet, Alert, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const router = useRouter();
  const [occupation, setOccupation] = useState('');
  const [incomeType, setIncomeType] = useState('รายวัน');
  const [income, setIncome] = useState('');
  const [statement, setStatement] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);

  const occupations = ['พนักงานประจำ', 'เจ้าของกิจการ', 'ฟรีแลนซ์', 'อื่น ๆ'];
  const incomeTypes = ['รายวัน', 'รายสัปดาห์', 'รายเดือน'];

  const pickImage = async (setter) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const calculateMonthlyIncome = () => {
    const incomeNum = parseFloat(income);
    if (isNaN(incomeNum) || incomeNum <= 0) return null;
    switch (incomeType) {
      case 'รายวัน': return incomeNum * 30;
      case 'รายสัปดาห์': return incomeNum * 4;
      case 'รายเดือน': return incomeNum;
      default: return null;
    }
  };

  const onConfirm = () => {
    Keyboard.dismiss();
    if (!occupation || !income || !statement || !idCard) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    const monthly = calculateMonthlyIncome();
    if (monthly === null) {
      Alert.alert('กรุณากรอกจำนวนรายได้ที่ถูกต้อง');
      return;
    }
    setMonthlyIncome(monthly);
    Alert.alert('รายได้ต่อเดือนของคุณคือ', monthly.toLocaleString() + ' บาท');
    router.push('/dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>โปรไฟล์รายได้</Text>
      <Text>เลือกอาชีพ</Text>
      {occupations.map((occ) => (
        <TouchableOpacity
          key={occ}
          style={[styles.option, occupation === occ && styles.selectedOption]}
          onPress={() => setOccupation(occ)}
        >
          <Text style={{ color: occupation === occ ? '#fff' : '#f60' }}>{occ}</Text>
        </TouchableOpacity>
      ))}

      <Text style={{ marginTop: 16 }}>เลือกรูปแบบรายได้</Text>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        {incomeTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.incomeType, incomeType === type && styles.incomeTypeSelected]}
            onPress={() => setIncomeType(type)}
          >
            <Text style={{ color: incomeType === type ? '#fff' : '#f60' }}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="กรอกจำนวนรายได้"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
        returnKeyType="done"
        onSubmitEditing={onConfirm}
      />

      <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>คอนเฟิร์ม</Text>
      </TouchableOpacity>

      {monthlyIncome !== null && (
        <Text style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold', color: '#f60' }}>
          รายได้ต่อเดือน: {monthlyIncome.toLocaleString()} บาท
        </Text>
      )}

      <Text style={{ marginTop: 16 }}>อัปโหลด statement</Text>
      <Button title="Upload Statement" onPress={() => pickImage(setStatement)} />
      {statement && <Image source={{ uri: statement }} style={styles.preview} />}

      <Text style={{ marginTop: 16 }}>อัปโหลดบัตรประชาชน</Text>
      <Button title="Upload ID Card" onPress={() => pickImage(setIdCard)} />
      {idCard && <Image source={{ uri: idCard }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#f60' },
  option: { borderWidth: 1, borderColor: '#f60', borderRadius: 16, padding: 8, marginVertical: 4 },
  selectedOption: { backgroundColor: '#f60' },
  incomeType: { borderWidth: 1, borderColor: '#f60', borderRadius: 16, padding: 8, marginRight: 8 },
  incomeTypeSelected: { backgroundColor: '#f60' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginVertical: 8 },
  preview: { width: 80, height: 80, marginVertical: 8 },
  confirmBtn: { backgroundColor: '#f60', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
});
