import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { documentDirectory, writeAsStringAsync } from "expo-file-system";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateNewClassScreen() {
  const router = useRouter();

  const handleBrowseFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        // Handle the selected file
        console.log("File selected:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleDownloadSample = async () => {
    const csvContent =
      "Student ID,First Name,Last Name\n1001,John,Doe\n1002,Jane,Smith";
    const fileUri = documentDirectory + "sample_students.csv";

    try {
      await writeAsStringAsync(fileUri, csvContent, {
        encoding: "utf8",
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "Download Sample CSV",
      });
    } catch (error) {
      console.error("Error downloading sample file:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios-new"
            size={22}
            color="#94a3b8"
          />
        </Pressable>

        <Text style={styles.headerTitle}>Create New Class</Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* CLASS NAME */}
        <View style={styles.section}>
          <Text style={styles.label}>Class Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="e.g., Biology 101 - Fall Semester"
              placeholderTextColor="#94a3b8"
              style={styles.input}
            />
            <MaterialIcons name="edit" size={20} color="#94a3b8" />
          </View>
        </View>

        {/* STUDENT LIST */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Student List</Text>
            <Text style={styles.required}>Required</Text>
          </View>

          {/* UPLOAD CSV */}
          <Pressable style={styles.uploadCard} onPress={handleBrowseFiles}>
            <View style={styles.uploadIcon}>
              <MaterialIcons name="upload-file" size={28} color="#13a4ec" />
            </View>

            <Text style={styles.uploadTitle}>Upload CSV File</Text>
            <Text style={styles.uploadDesc}>
              Tap to browse your files. Supports .csv format only.
            </Text>

            <View style={styles.browseBtn}>
              <Text style={styles.browseText}>Browse Files</Text>
            </View>
          </Pressable>

          {/* DOWNLOAD SAMPLE */}
          <Pressable style={styles.downloadRow} onPress={handleDownloadSample}>
            <MaterialIcons name="download" size={18} color="#13a4ec" />
            <Text style={styles.downloadText}>
              Download Sample CSV Template
            </Text>
          </Pressable>

          {/* OR DIVIDER */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* ADD MANUALLY */}
          <Pressable style={styles.manualCard}>
            <View style={styles.manualLeft}>
              <View style={styles.manualIcon}>
                <MaterialIcons name="person-add" size={24} color="#13a4ec" />
              </View>

              <View>
                <Text style={styles.manualTitle}>
                  Add Students Manually
                </Text>
                <Text style={styles.manualDesc}>
                  Input student details individually
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="chevron-right"
              size={26}
              color="#94a3b8"
            />
          </Pressable>
        </View>

        {/* INFO BOX */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color="#13a4ec" />
          <Text style={styles.infoText}>
            Make sure your CSV includes columns for{" "}
            <Text style={styles.infoBold}>Student ID</Text>,{" "}
            <Text style={styles.infoBold}>First Name</Text>, and{" "}
            <Text style={styles.infoBold}>Last Name</Text>.
          </Text>
        </View>
      </ScrollView>

      {/* SAVE BUTTON */}
      <View style={styles.footer}>
        <Pressable style={styles.saveBtn}>
          <MaterialIcons name="save" size={20} color="#fff" />
          <Text style={styles.saveText}>Save Class</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101c22",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 40,
    color: "#fff",
    marginTop: 50,
    marginBottom: 20,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 160,
  },

  section: {
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#192b33",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  required: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    backgroundColor: "#64748b62",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    color: "#b0c1d8ff",
  },

  uploadCard: {
    backgroundColor: "#192b33",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#64748b62",
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(19,164,236,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#fff"
  },

  uploadDesc: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 14,
  },

  browseBtn: {
    backgroundColor: "#64748b62",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  browseText: {
    color: "#fff",
    fontWeight: "600",
  },

  downloadRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },

  downloadText: {
    color: "#13a4ec",
    fontSize: 13,
    textDecorationLine: "underline",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#192b33",
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
  },

  manualCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#192b33",
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: "#64748b62",
  },

  manualLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  manualIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(19,164,236,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  manualTitle: {
    fontSize: 15,
    fontWeight: "700",
    color:"#fff"
  },

  manualDesc: {
    fontSize: 13,
    color: "#64748b",
  },

  infoBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#192b33",
    padding: 16,
    borderRadius: 14,
  },

  infoText: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
    flex: 1,
  },

  infoBold: {
    fontWeight: "700",
    color: "#fff",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "#101c22",
  },

  saveBtn: {
    height: 56,
    backgroundColor: "#13a4ec",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});