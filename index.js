const {parse} = require('csv-parse');
const fs = require('fs');


const results = [];

function isHabitable (planets){
  const reqPlanets = planets['koi_disposition']==='CONFIRMED'
   && planets['koi_insol']>0.36
    && planets['koi_insol']<1.11
    && planets['koi_prad']<1.6;
  return reqPlanets;
}



fs.createReadStream('kepler_data.csv')
.pipe(parse({comment:'#',columns:true}))

.on('data',(data)=>{
  if (isHabitable(data)) {
    results.push(data);
  }
  
})
.on('error',(err)=>{
  console.log(err);
})
.on('end',()=>{
  console.log(results.map((planet)=>{
    return planet['kepler_name']
  }));
  console.log(`${results.length} habitable planets found`);
})