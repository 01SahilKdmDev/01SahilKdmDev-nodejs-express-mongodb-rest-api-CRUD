const express = require('express')
const mongoose = require('mongoose')


const app = express();
const port = process.env.port||3000;


app.use(express.json());
app.use(express.urlencoded({extended: false}))


mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://01sahilkdmADMIN:$Kdttitude850@sahilapi.r00706a.mongodb.net/Movies?retryWrites=true&w=majority&appName=SahilAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');

    app.listen(3000, async ()=> {
        console.log(`Node API app is running on port 3000`)
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


const MoviesSchema = mongoose.Schema(
    {
        // id: {
        //     type: String,
        //     required: true
        // },
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        }
    }, { timestamps: true }
) 
const MoviesDetails = mongoose.model('Movies', MoviesSchema);



app.get('/fetchall', async(req, res) => 
 {
    try {
    
        const MOVIESall = await MoviesDetails.find();
        res.send(MOVIESall);
    }catch(error) {
      res.status(500).send(error);
    }
}
  );




app.post("/addmovie", async(req, res) =>
{
    // console.log("inside post fuction");
    const data=new MoviesDetails({
        id:req.body.id,
        name:req.body.name,
        img:req.body.img,
        summary:req.body.summary
    })
    const val =await data.save();
    res.json(val);
})




app.put('/update/:name', async(req,res)=> {
    try{
const movieName =req.params.name;
const existingmovie = await MoviesDetails.findOne({name:movieName});
if(!existingmovie){
    return res.status(404).json({error: 'Movie not found'});
}
existingmovie.img = req.body.img || existingmovie.img;
existingmovie.summary = req.body.summary ||  existingmovie.summary;
const updatedmovie = await existingmovie.save();
res.json( {massage: 'movie updated'});
// res.json(updatedmovie);
    }
    catch(err){
        console.error('error :', err);
        res.status(500).json({error: 'internal server error'});
    }
})




app.delete('/delete/:name', async(req,res)=> {
    try{
const movieName =req.params.name;
const existingmovie = await MoviesDetails.findOne({name:movieName});
if(!existingmovie){
    return res.status(404).json({error: 'Movie not found'});
}
// await existingmovie.remove(); 
const result = await MoviesDetails.deleteOne({ name: movieName });
res.json( {massage: 'movie deleted'});
    }
    catch(err){
        console.error('error :', err);
        res.status(500).json({error: 'internal server error'});
    }
})












































































