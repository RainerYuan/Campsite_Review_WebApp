const mongoose=require('mongoose');
const Campground=require("../models/campground")
const cities=require('./cities')
const { places, descriptors }=require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db=mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database Connected");
});

const sample=(arr) => arr[Math.floor(Math.random()*arr.length)]



const seedDB=async () => {
    await Campground.deleteMany({});

    for (let i=0; i<200; i++) {
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            author: '615e11d17a463eda8ecde919',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'This is a very amazing camp ground for everyone who loves camping',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbqjfnpsr/image/upload/v1633813941/YelpCamp/umbmbfinjbmr9f9cdvg2.jpg',
                    filename: 'YelpCamp/umbmbfinjbmr9f9cdvg2',
                },

                {
                    url: 'https://res.cloudinary.com/dbqjfnpsr/image/upload/v1633718798/YelpCamp/pqthqapylmv9znwjua40.jpg',
                    filename: 'YelpCamp/pqthqapylmv9znwjua40',
                },
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})