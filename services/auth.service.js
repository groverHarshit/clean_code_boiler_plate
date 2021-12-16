const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const secret =
    process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "admin";

const authService = () => {
    const issue = (payload) => jwt.sign(payload, secret, { expiresIn: "7d" });

    const onetime_issue = (payload) =>
        jwt.sign(payload, secret, { expiresIn: 7200 }); //2 hours

    const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

    const apiAuth = async (req, res, next) => {
        if (!req.headers["authorization"]) {
            return res
                .status(401)
                .json({ success: false, msg: "Authorization Token not found" });
        }

        if (!req.headers['apikey']) {
            return res
                .status(401)
                .json({ success: false, msg: "Authorization Key not found" });
        }

        if (req.headers['apikey'] !== process.env.api_key) {
            return res
                .status(401)
                .json({ success: false, msg: "Authorization Key not found" });
        }

        const parts = req.header("authorization").split(" ");
        const scheme = parts[0];
        const credentials = parts[1];

        let tokenToVerify;
        if (/^Bearer$/.test(scheme)) {
            tokenToVerify = credentials;
        } else {
            return res
                .status(401)
                .json({ success: false, msg: "Invalid Token! Login again." });
        }

        verify(tokenToVerify, async (err, data) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid Token!",
                });
            }

            const user = await userModel.findOne({
                _id: data.id,
            });

            if (!user) {
                return res
                    .status(401)
                    .json({ success: false, msg: "Invalid user, User not found" });
            }

            delete user._doc.password;

            req.user = user;
            return next();
        });
    };

    return {
        issue,
        onetime_issue,
        verify,
        apiAuth,
    };
};

module.exports = authService();