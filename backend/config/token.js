import jwt from 'jsonwebtoken';

const genToken = async (userId) => {

    try{

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: '10y'});
        return token;

    }
    catch(error){
        console.error("Error generating token:", error);
        return res.status(500).json({ message: "gen token error" });
    }

}

export default genToken;