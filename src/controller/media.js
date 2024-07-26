import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getMedia = (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "uploads",
      req.params.filename
    );
    res.sendFile(filePath);
  } catch (err) {
    console.err("error fetching image: ", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
