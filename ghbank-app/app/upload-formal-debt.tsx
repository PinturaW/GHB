import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.header}>Upload Your Formal Debt</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type of Debt</Text>
        <View style={styles.row}>
          {DEBT_TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeBtn, type === t && styles.typeBtnSelected]}
              onPress={() => setType(t)}
            >
              <Text style={{ color: type === t ? '#fff' : '#f60', fontSize: 12 }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Outstanding Balance</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.00"
          value={balance}
          onChangeText={setBalance}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Due Date</Text>
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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Proof</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
          <Text style={styles.uploadBtnText}>Upload Photo or File</Text>
        </TouchableOpacity>
        {proof && <Image source={{ uri: proof }} style={styles.preview} />}
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Add Formal Debt</Text>
      </TouchableOpacity>

      <View style={styles.pushReminder}>
        <Text style={styles.reminderText}>
          Push Reminder: You'll be notified monthly to update your debt status.
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
    padding: 8, 
    marginRight: 8, 
    marginBottom: 8,
    minWidth: 80,
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
  pushReminder: { 
    backgroundColor: '#fffbe6', 
    borderRadius: 8, 
    padding: 16, 
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f60'
  },
  reminderText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  }
});
