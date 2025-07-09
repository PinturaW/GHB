import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function SelfBusinessScreen() {
  const [productPhoto, setProductPhoto] = useState(null);
  const [storefrontPhoto, setStorefrontPhoto] = useState(null);
  const [invoicePhoto, setInvoicePhoto] = useState(null);
  const [desc, setDesc] = useState('');

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

  const onVerify = () => {
    if (!productPhoto || !storefrontPhoto || !invoicePhoto || !desc) {
      Alert.alert('กรุณาอัปโหลดไฟล์และกรอกข้อมูลให้ครบถ้วน');
      return;
    }
    Alert.alert('ส่งข้อมูลสำเร็จ', 'ระบบได้รับข้อมูลยืนยันธุรกิจของคุณแล้ว');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Self-Business Verification</Text>
      <Text>Photo of product or service*</Text>
      <Button title="Upload Photo" onPress={() => pickImage(setProductPhoto)} />
      {productPhoto && <Image source={{ uri: productPhoto }} style={styles.preview} />}
      
      <Text>Photo of storefront*</Text>
      <Button title="Upload Photo" onPress={() => pickImage(setStorefrontPhoto)} />
      {storefrontPhoto && <Image source={{ uri: storefrontPhoto }} style={styles.preview} />}
      
      <Text>Invoice / Order screenshot*</Text>
      <Button title="Upload File" onPress={() => pickImage(setInvoicePhoto)} />
      {invoicePhoto && <Image source={{ uri: invoicePhoto }} style={styles.preview} />}
      
      <Text style={{ marginTop: 12 }}>Describe your business</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your business"
        value={desc}
        onChangeText={setDesc}
        multiline
      />
      <Button title="Verify My Business" color="#f60" onPress={onVerify} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4F0', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#f60', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginVertical: 8, backgroundColor: '#fff' },
  preview: { width: 100, height: 100, marginVertical: 8, borderRadius: 8 },
});
