import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config/api";

export default function AddEntryScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    customer: "",
    partNumber: "",
    partDescription: "",
    inspectionDate: "",
    shift: "",
    dimensions: {
      totalLength: { spec: "", actual: "" },
      width1: { spec: "", actual: "" },
      width2: { spec: "", actual: "" },
    },
    visualObservation: "",
    remarks: "",
    qa: "",
    reviewedBy: "",
    approvedBy: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${BASE_URL}api/report/create`, form);
      alert("✅ Entry added successfully!");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert("❌ Error adding entry");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {step === 1 && (
        <View>
          <Text style={styles.label}>Customer</Text>
          <TextInput style={styles.input} value={form.customer} onChangeText={(t) => handleChange("customer", t)} />
          <Text style={styles.label}>Part Number</Text>
          <TextInput style={styles.input} value={form.partNumber} onChangeText={(t) => handleChange("partNumber", t)} />
          <Text style={styles.label}>Part Description</Text>
          <TextInput style={styles.input} value={form.partDescription} onChangeText={(t) => handleChange("partDescription", t)} />
          <Button title="Next ➡️" onPress={() => setStep(2)} />
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.label}>Inspection Date</Text>
          <TextInput style={styles.input} value={form.inspectionDate} onChangeText={(t) => handleChange("inspectionDate", t)} />
          <Text style={styles.label}>Shift</Text>
          <TextInput style={styles.input} value={form.shift} onChangeText={(t) => handleChange("shift", t)} />
          <Button title="Next ➡️" onPress={() => setStep(3)} />
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.label}>Total Length Spec</Text>
          <TextInput
            style={styles.input}
            value={form.dimensions.totalLength.spec}
            onChangeText={(t) =>
              setForm({
                ...form,
                dimensions: {
                  ...form.dimensions,
                  totalLength: { ...form.dimensions.totalLength, spec: t },
                },
              })
            }
          />
          <Text style={styles.label}>Total Length Actual</Text>
          <TextInput
            style={styles.input}
            value={form.dimensions.totalLength.actual}
            onChangeText={(t) =>
              setForm({
                ...form,
                dimensions: {
                  ...form.dimensions,
                  totalLength: { ...form.dimensions.totalLength, actual: t },
                },
              })
            }
          />
          <Button title="Next ➡️" onPress={() => setStep(4)} />
        </View>
      )}

      {step === 4 && (
        <View>
          <Text style={styles.label}>Visual Observation</Text>
          <TextInput style={styles.input} value={form.visualObservation} onChangeText={(t) => handleChange("visualObservation", t)} />
          <Text style={styles.label}>Remarks</Text>
          <TextInput style={styles.input} value={form.remarks} onChangeText={(t) => handleChange("remarks", t)} />
          <Button title="Next ➡️" onPress={() => setStep(5)} />
        </View>
      )}

      {step === 5 && (
        <View>
          <Text style={styles.label}>QA</Text>
          <TextInput style={styles.input} value={form.qa} onChangeText={(t) => handleChange("qa", t)} />
          <Text style={styles.label}>Reviewed By</Text>
          <TextInput style={styles.input} value={form.reviewedBy} onChangeText={(t) => handleChange("reviewedBy", t)} />
          <Text style={styles.label}>Approved By</Text>
          <TextInput style={styles.input} value={form.approvedBy} onChangeText={(t) => handleChange("approvedBy", t)} />
          <Button title="✅ Submit" onPress={handleSubmit} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10, borderRadius: 5 },
});
