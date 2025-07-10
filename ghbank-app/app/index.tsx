import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>โปรไฟล์รายได้</Text>
      
      <Text style={styles.sectionTitle}>เลือกอาชีพ</Text>
      {occupations.map((occ) => (
        <TouchableOpacity
          key={occ}
          style={[styles.option, occupation === occ && styles.selectedOption]}
          onPress={() => setOccupation(occ)}
        >
          <Text style={{ color: occupation === occ ? '#fff' : '#f60' }}>{occ}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>เลือกรูปแบบรายได้</Text>
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
        <Text style={styles.monthlyIncomeText}>
          รายได้ต่อเดือน: {monthlyIncome.toLocaleString()} บาท
        </Text>
      )}

      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>อัปโหลด statement</Text>
      <Button title="Upload Statement" onPress={() => pickImage(setStatement)} />
      {statement && <Image source={{ uri: statement }} style={styles.preview} />}

      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>อัปโหลดบัตรประชาชน</Text>
      <Button title="Upload ID Card" onPress={() => pickImage(setIdCard)} />
      {idCard && <Image source={{ uri: idCard }} style={styles.preview} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  contentContainer: { 
    padding: 24,
    paddingBottom: 40 // เพิ่ม padding ด้านล่างเพื่อให้เลื่อนได้สบาย
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    color: '#f60' 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8
  },
  option: { 
    borderWidth: 1, 
    borderColor: '#f60', 
    borderRadius: 16, 
    padding: 12, 
    marginVertical: 4,
    alignItems: 'center'
  },
  selectedOption: { 
    backgroundColor: '#f60' 
  },
  incomeType: { 
    borderWidth: 1, 
    borderColor: '#f60', 
    borderRadius: 16, 
    padding: 8, 
    marginRight: 8,
    flex: 1,
    alignItems: 'center'
  },
  incomeTypeSelected: { 
    backgroundColor: '#f60' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    padding: 12, 
    marginVertical: 8,
    fontSize: 16
  },
  preview: { 
    width: 100, 
    height: 100, 
    marginVertical: 8,
    borderRadius: 8
  },
  confirmBtn: { 
    backgroundColor: '#f60', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 24 
  },
  monthlyIncomeText: {
    marginTop: 16, 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#f60',
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#fff4e6',
    borderRadius: 8
  }
});
