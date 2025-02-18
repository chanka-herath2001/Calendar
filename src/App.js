import "@fontsource/poppins"; // Import Poppins font
import { Container, Grid, TextField, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import Lottie from "lottie-react"; // Import Lottie
import React, { useEffect, useState } from "react";
import animationData from "./assets/animations/soup.json"; // Import your Lottie JSON file
import SoupCard from "./components/SoupCard";
import { db } from "./firebase/firebaseConfig";

const App = () => {
  const [soups, setSoups] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredSoups, setFilteredSoups] = useState([]); // State for filtered soups

  useEffect(() => {
    const fetchSoupsFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "soups"));
        const fetchedSoups = querySnapshot.docs.map((doc) => doc.data());
        setSoups(fetchedSoups);
        setFilteredSoups(fetchedSoups); // Initially set filteredSoups to all soups
      } catch (error) {
        console.error("❌ Error fetching soups from Firestore:", error);
      }
    };

    fetchSoupsFromFirebase();
  }, []);

  // Function to filter soups based on search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = soups.filter((soup) =>
      soup.Recipe_Name.toLowerCase().includes(query)
    );
    setFilteredSoups(filtered);
  };

  return (
    <Container
      style={{
        marginTop: "20px",
        padding: "0 20px",
        marginBottom: "20px",
        position: "relative",
      }}
    >
      {/* Lottie Animation in Top-Right Corner */}
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "5px",
          width: "100px",
          height: "100px",
          marginBottom: "50px",
        }}
      >
        <Lottie animationData={animationData} loop={true} />
      </div>
      <br />
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          margin: "20px 0",
          color: "#ff85a2",
          fontWeight: "bold",
          fontFamily: "Poppins",
        }}
      >
        Soup Calendar
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search for a Soup..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />

      <Grid container spacing={2} justifyContent="center">
        {filteredSoups.map((soup, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SoupCard soup={soup} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
