import mongoose from "mongoose";

const productSchmea=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        maxLength:[200,"Product name cannot exceed 200 character"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[5,"product price cannot exceed 5 digits"]
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }

     ],
     category:{
        type:String,
        required:[true,"please enter product category"],
        enum:{
            values:[
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Sports",
                "Outdoor",
                "Home",
            ],
            message:"please select correct category",
        },
    },

    seller:{
        type:String,
        required:[true,"Please enter product seller"],
    },

    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
    },

    numOfReviews:{
        type:Number,
        default:0
    },

    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true,

            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,

            }
        }
    ],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
   

},
{timestamps:true}
)

export default mongoose.model('Product',productSchmea)