import { collection, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import { db } from "./firebaseConfig.js";

// Read the JSON file manually
const soupsData = JSON.parse(
  fs.readFileSync("./public/soups_filtered.json", "utf8")
);

const uploadSoupsToFirestore = async () => {
  try {
    for (let soup of soupsData) {
      const soupRef = doc(collection(db, "soups"), soup.Recipe_Name);
      await setDoc(soupRef, soup);
    }
    console.log("✅ Successfully uploaded soups to Firestore!");
  } catch (error) {
    console.error("❌ Error uploading soups:", error);
  }
};

uploadSoupsToFirestore();
