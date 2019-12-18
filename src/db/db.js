const mongoose = require("mongoose");



if (process.env.NODE_ENV === "production") {
  mongoose.connect(
    "mongodb+srv://sirsuccess:blessing@naijarecycler-wjbyi.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  );
}else{
  mongoose.connect('mongodb://localhost:27017/naija', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
}