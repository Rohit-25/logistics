const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


// get all menu
router.get('/menu', async (req, res, next) => {
  try{
      const menu = await prisma.menu.findMany({
      include : { permission : true}
    });
    res.json(menu)
  }catch(error){
    next(error)
  }
});

//permission with id
router.get('/menu/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const menu= await prisma.menu.findUnique({
      where : {
        id : Number(id) 
      },
      include : {
        role : true
      }
    },)

   res.json(menu)

  }catch(error){
   next(error)
  }
  
});

//create menu
router.post('/menu', async (req, res, next) => {

  try{
    const { name} = req.body;
    console.log(req.body)
    const menu = await prisma.menu.create({
      data: {
       name
       
      }
    });
    res.json({menu})
  }catch(error){
   next(error)
  }
  
});



router.delete('/menu/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const menu = await prisma.menu.delete({
      where : {
        id : Number(id)
      }
    })
    res.send("menu deleted")

  }catch(error){
   next(error)
  }
  
});

router.patch('/menu/:id', async (req, res, next) => {
  try{
   const id = req.params.id;
   const data = req.body;
   const menu = await prisma.menu.update({
    where:{
      id : Number(id)
    },
    data :data,
   
   })
   res.json(menu)
  }catch(error){
    next(error)
  }
});


module.exports = router;
