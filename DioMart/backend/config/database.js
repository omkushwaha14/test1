const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        
   //useFindAndModify: false, 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
        
    },err=>{
        if(err){
            throw err;
            
        }
        else{
            console.log('connected to database');
        }
    })
}

module.exports = connectDatabase