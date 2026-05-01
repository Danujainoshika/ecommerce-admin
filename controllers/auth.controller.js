import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from '../models/index.js';



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            {
                id : user.id,
                role : user.role
            },process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({ token });        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }



    
}

