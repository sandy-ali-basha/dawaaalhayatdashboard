import React, { useState } from "react";
import { Button, Card, CardContent, CardMedia} from "@mui/material";
import TextEditor from "components/TextEditor";

const TextWithBtn = () => {
  const [description, setDescription] = useState(
    "Editable description goes here."
  );
 

  return (
    <Card sx={{ width: "100%" }}>
   
      <CardContent>
        <TextEditor
          editorContent={description}
          setEditorContent={setDescription}
        />
        <Button><input type="text"  /></Button>
      </CardContent>
    </Card>
  );
};

export default TextWithBtn;
