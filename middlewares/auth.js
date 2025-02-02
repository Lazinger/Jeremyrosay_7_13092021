const jwt = require("jsonwebtoken");
const AUTH_TOKEN = process.env.AUTH_TOKEN;

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, `${AUTH_TOKEN}`);
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "Requete non authentifié" });
	}
};
