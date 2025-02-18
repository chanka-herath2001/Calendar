import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

const RecipeDialog = ({ open, onClose, soup }) => {
  // Ensure Ingredients are properly formatted into a list
  const ingredientList = Array.isArray(soup.Ingredients)
    ? soup.Ingredients
    : soup.Ingredients.replace(/\[|\]|'/g, "").split(", "); // Convert string list to array if necessary

  // Ensure Instructions are formatted as a numbered list
  const instructionList = soup.Instructions
    ? soup.Instructions.split(/(?=\d\.)/).map((step) => step.trim()) // Splits at "1.", "2.", etc.
    : [];

  return (
    <Dialog 
      open={open} 
      onClose={(e) => {
        e.stopPropagation(); // Prevent marking/unmarking when clicked
        onClose();
      }}
    >
      <DialogTitle style={{fontFamily: "Poppins", fontWeight:"bold"}}>{soup.Recipe_Name}</DialogTitle>
      <DialogContent>
        {/* Ingredients */}
        <Typography variant="h6">Ingredients:</Typography>
        <ul>
          {ingredientList.map((ingredient, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>{ingredient}</li>
          ))}
        </ul>

        {/* Instructions */}
        <Typography variant="h6" style={{ marginTop: "10px" }}>Instructions:</Typography>
        {instructionList.map((step, index) => (
          <Typography key={index} variant="body1" style={{ marginBottom: "5px" }}>
            {step}
          </Typography>
        ))}

        {/* Close Button */}
        <Button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent marking/unmarking when clicked
            onClose();
          }} 
          style={{ marginTop: 10 }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDialog;
