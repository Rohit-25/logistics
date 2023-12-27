const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


// get all permission
router.get('/permission', async (req, res, next) => {
  try{
      const permission = await prisma.permisson.findMany({
      include : { role : true}
    });
    res.json(permission)
  }catch(error){
    next(error)
  }
});

//permission with id
router.get('/permission/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const permission = await prisma.permisson.findUnique({
      where : {
        id : Number(id) 
      },
      include : {
        role : true
      }
    },)

   res.json(permission)

  }catch(error){
   next(error)
  }
  
});

//create role
router.post('/permission', async (req, res, next) => {

  try{
    const { name} = req.body;
    console.log(req.body)
    const permission = await prisma.permisson.create({
      data: {
       name
       
      }
    });
    res.json({permission})
  }catch(error){
   next(error)
  }
  
});



router.delete('/permission/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const permission = await prisma.permisson.delete({
      where : {
        id : Number(id)
      }
    })
    res.send("permission deleted")

  }catch(error){
   next(error)
  }
  
});

router.patch('/permission/:id', async (req, res, next) => {
  try{
   const id = req.params.id;
   const data = req.body;
   const permission = await prisma.permisson.update({
    where:{
      id : Number(id)
    },
    data :data,
   
   })
   res.json(permission)
  }catch(error){
    next(error)
  }
});


module.exports = router;
