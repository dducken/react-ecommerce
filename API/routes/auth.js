const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Handle Errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {password: ''};

    // validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


//REGISTER
router.post("/register", async (req, res) => {
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, process.env.PASS_SEC
        ).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(501).json({errors});
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        !user && res.status(401).json("Email or password incorrect!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password && res.status(401).json("Email or password incorrect!");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, 
        { expiresIn: "300d"}
        );

        const {
            password,
            ...others
        } = user._doc;

        // user.refreshToken = accessToken;
        // const result = await user.save();
        // console.log(result);

        // res.cookie('jwt', accessToken);
        res.status(200).json({...others, accessToken});
       
    } catch (err) {
        res.status(501).json(err);
    }
})

//LOGOUT
// router.post("/logout", async (req, res) => {
    
//    try {
//     const cookies = req.cookies;
//     if(!cookies?.jwt) return res.status(200);
//     const refreshToken = cookies.jwt;

//     // Is refreshToken in db?
//     const user = await User.findOne({ refreshToken }).exec();
//     if (!user) {
//         res.clearCookie('jwt');
//         return res.status(200).json('Cookies were deleted!')
//     }

//     // Delete refreshToken in db
//     user.refreshToken = '';
//     const result = await user.save();
//     console.log(result);

//     res.clearCookie('jwt');
//     res.status(200).json('Cookies were deleted!')
//    } catch (err) {
//     res.status(404).json('Oops!')
//    }

// });


module.exports = router;