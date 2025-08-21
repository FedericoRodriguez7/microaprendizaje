import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb"; 
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ msg: "Método no permitido" });

  try {
    const { name, email, password } = req.body;

    await connectDB();

    // Verificar usuario existente
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "El usuario ya existe" });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ msg: "Usuario registrado", user: { id: newUser._id, email: newUser.email } });
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
}
