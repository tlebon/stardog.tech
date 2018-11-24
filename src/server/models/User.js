const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
        default:
            'https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg',
    },
    // posts: {
    //     collection:
    //         [{
    //             main_title: {
    //                 type: String,
    //                 required: false,
    //             }
    //             [{
    //                 chapter: {
    //                     default: 0,
    //                     required: false,
    //                 },
    //                 entry: {
    //                     type: String,
    //                     required: true,
    //                 },
    //                 title: {
    //                     type: String,
    //                     required: false,
    //                 },
    //                 type:{
    //                     type:String,
    //                     default:unsorted,
    //                     required:true
    //                 },
    //                 private: {
    //                     type: boolean,
    //                     default: false
    //                 },
    //                 likedByUser: [{ type: String }],
    //                 timestamps: {
    //                     createdAt: "created_at",
    //                     updatedAt: "updated_at"
    //                 },
    //             }]
    //       }],

    //     unsorted: [{
    //         title: {
    //             type: String,
    //             required: false,
    //         },
    //         entry: {
    //             type: String,
    //             required: true,
    //         },
    //         private: {
    //             type: boolean,
    //             default: false
    //         },
    //         type:{
    //             type:String,
    //             default:unsorted,
    //             required:true
    //         },
    //         likedByUser: [{ type: String }],
    //     }]
    // }
},
                       { timestamps: {
                            createdAt: "created_at",
                            updatedAt: "updated_at"
                        },}
)

module.exports = mongoose.model('User', userSchema)
