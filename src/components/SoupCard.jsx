import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import RecipeDialog from "./RecipeDialog";

const SoupCard = ({ soup }) => {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reference to Firestore document (single-user mode)
  const soupRef = doc(db, "completedSoups", soup.Recipe_Name);

  // Check Firestore if the soup is already marked as completed
  useEffect(() => {
    const checkCompleted = async () => {
      const docSnap = await getDoc(soupRef);
      if (docSnap.exists()) {
        setCompleted(true);
      }
    };
    checkCompleted();
  }, [soupRef]);

  // Mark or unmark the soup
  const toggleCompleted = async () => {
    setLoading(true);

    try {
      if (!completed) {
        // ✅ Mark as completed (Add to Firebase)
        await setDoc(soupRef, {
          name: soup.Recipe_Name,
          recipe: soup.Instructions,
          completedAt: new Date(),
        });
      } else {
        // ❌ Unmark (Remove from Firebase)
        await deleteDoc(soupRef);
      }

      setCompleted(!completed);
    } catch (error) {
      console.error("❌ Error updating Firestore:", error);
    }

    setLoading(false);
  };

  return (
    <Card
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          toggleCompleted();
        }
      }}
      style={{
        width: "320px",
        height: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: completed ? "#a0e0a0" : "#fff", // Green shade if completed
        cursor: "pointer",
        textAlign: "center",
        padding: "10px",
        borderRadius: "10px",
        border: "2px solid #ff85a2",
        position: "relative",
        fontSize: "18px",
        overflow: "hidden",
        wordWrap: "break-word",
      }}
    >
      {/* Move ? Button to Top-Right Corner */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // Prevent marking/unmarking when clicked
          setOpen(true);
        }}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          backgroundColor: "white",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <HelpOutlineIcon />
      </IconButton>

      <CardContent
        style={{ padding: "10px", position: "relative" }}
        onClick={(e) => e.stopPropagation()} // Prevent marking/unmarking when content is clicked
      >
        {/* Show a tick when completed */}
        {completed && (
          <CheckCircleIcon
            style={{
              fontSize: "80px",
              color: "green",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: "0.8",
            }}
          />
        )}
        
        {/* Soup Name */}
        <Typography
          variant="h6"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            wordWrap: "break-word",
            maxHeight: "60px",
            opacity: completed ? "0.5" : "1", // Fade text when completed
          }}
        >
          {soup.Recipe_Name}
        </Typography>
      </CardContent>

      {/* Recipe Dialog */}
      <RecipeDialog open={open} onClose={() => setOpen(false)} soup={soup} />
    </Card>
  );
};

export default SoupCard;
