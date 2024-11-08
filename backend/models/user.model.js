import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1                                              //once added something, default to 1
            },
            product: {                                                  // reference to actual product entity
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, {
    timestamps: true                                       //Optional object: createdAt, updatedAt 
});

// pre-save hook to hash password before saving to DB
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();                     // if password hasnt been changed, called next func

    try {
        const salt = await bcrypt.genSalt(10);                          // generate salt to default 10 chars 
        this.password = await bcrypt.hash(this.password, salt);         // generate hash with entered password + salt
        next();                                                         // next func (w/e that is)
    } catch (error) {
        next(error);
    }

});

// password checker, comparing stored pass with entered pass
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);   
}

const User = mongoose.model("User", userSchema);

export default User; 