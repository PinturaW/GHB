import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.header}>Upload Financial Discipline Proof</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type of Proof</Text>
        <View style={styles.row}>
          {PROOF_TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeBtn, type === t && styles.typeBtnSelected]}
              onPress={() => setType(t)}
            >
              <Text style={{ color: type === t ? '#fff' : '#f60', fontSize: 14 }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amount Paid (optional)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date of Payment (optional)</Text>
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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Proof</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
          <Text style={styles.uploadBtnText}>Upload Photo or File</Text>
        </TouchableOpacity>
        {proof && <Image source={{ uri: proof }} style={styles.preview} />}
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={onSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Submit Financial Proof</Text>
      </TouchableOpacity>
      
      <View style={styles.trustPointsBox}>
        <Text style={styles.trustPointsText}>
          +2 Trust Points for each verified upload
        </Text>
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
    padding: 24,
    paddingBottom: 40
  },
  header: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#f60', 
    marginBottom: 24,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 12, 
    backgroundColor: '#fff',
    fontSize: 16,
    justifyContent: 'center'
  },
  preview: { 
    width: 120, 
    height: 120, 
    marginTop: 12, 
    borderRadius: 8,
    alignSelf: 'center'
  },
  confirmBtn: { 
    backgroundColor: '#f60', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 24 
  },
  row: { 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  typeBtn: { 
    borderWidth: 1, 
    borderColor: '#f60', 
    borderRadius: 16, 
    padding: 12, 
    marginRight: 8, 
    marginBottom: 8,
    minWidth: 100,
    alignItems: 'center'
  },
  typeBtnSelected: { 
    backgroundColor: '#f60' 
  },
  uploadBtn: {
    backgroundColor: '#f60',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  trustPointsBox: {
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f60'
  },
  trustPointsText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic'
  }
});
