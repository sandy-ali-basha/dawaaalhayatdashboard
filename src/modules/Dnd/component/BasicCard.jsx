import React, { useState } from "react";
import { Card, CardContent, CardMedia} from "@mui/material";
import TextEditor from "components/TextEditor";

const BasicCard = () => {
  const [description, setDescription] = useState(
    "Editable description goes here."
  );
  const [image, setImage] = useState("https://via.placeholder.com/300");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        component="img"
        height="30vh"
        image={image}
        alt="Editable"
        style={{ cursor: "pointer" }}
        onClick={() => document.getElementById("imageInput").click()}
      />
      <input
        type="file"
        id="imageInput"
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <CardContent>
        <TextEditor
          editorContent={description}
          setEditorContent={setDescription}
        />
      </CardContent>
    </Card>
  );
};

export default BasicCard;
