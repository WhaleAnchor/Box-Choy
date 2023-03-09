import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../firebase/firebase";
import './Inventory.css'

// material ui imports
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const Inventory = () => {
  const boxesColRef = collection(db, "boxes");
  const materialsColRef = collection(db, "materials");

  const [newBoxLength, setNewBoxLength] = useState([])
  const [newBoxWidth, setNewBoxWidth] = useState([])
  const [newBoxHeight, setNewBoxHeight] = useState([])
  const [newBoxPrice, setNewBoxPrice] = useState([])
  const [newBoxQuantity, setNewBoxQuantity] = useState([])
  const [newMaterialName, setnNewMaterialName] = useState([])
  const [newMaterialCount, setNewMaterialCount] = useState([])

  // Adding new boxes
  const addBox = async (event) => {
    event.preventDefault();
    // Add the new box to Firestore
    await addDoc(boxesColRef, { boxlength: Number(newBoxLength), boxwidth: Number(newBoxWidth), boxheight: Number(newBoxHeight), boxprice: Number(newBoxPrice), boxquantity: Number(newBoxQuantity) });
    window.location.reload(false);
  };

  const addMaterials = async (event) => {
    event.preventDefault();
    // Add the new materials to Firestore
    await addDoc(materialsColRef, { materialName: newMaterialName, materialCount: newMaterialCount});
    window.location.reload(false);
  };
  
  const boxStyles = { '& > :not(style)': { m: 1, width: '8ch' } };

  return (
    
    <div className="inventoryWrapper">
       <Grid className="inputGrid">
          <Box component="form" sx={boxStyles} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Length" variant="outlined" onChange={(event) => setNewBoxLength(event.target.value)} />
          </Box>
          <Box component="form" sx={boxStyles} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Width" variant="outlined" onChange={(event) => setNewBoxWidth(event.target.value)} />
          </Box>
          <Box component="form" sx={boxStyles} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Height" variant="outlined" onChange={(event) => setNewBoxHeight(event.target.value)} />
          </Box>
          <Box component="form" sx={boxStyles} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Price" variant="outlined" onChange={(event) => setNewBoxPrice(event.target.value)} />
          </Box>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '9ch' } }} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Quantity" variant="outlined" onChange={(event) => setNewBoxQuantity(event.target.value)} />
          </Box>
          <Stack spacing={2} direction="row">
            <Button variant="text" onClick={addBox}>Add Box</Button>
          </Stack>
        </Grid>

        <Grid className="inputGrid">
          <Box component="form" sx={boxStyles} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setnNewMaterialName(event.target.value)} />
          </Box>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '9ch' } }} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Count" variant="outlined" onChange={(event) => setNewMaterialCount(event.target.value)} />
          </Box>
          <Stack spacing={2} direction="row">
            <Button variant="text" onClick={addMaterials}>Add Materials</Button>
          </Stack>
        </Grid>

        
      
    </div>
  );
};

export default Inventory;