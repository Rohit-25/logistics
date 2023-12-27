const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


// get all role
router.get('/roles', async (req, res, next) => {
  try{
      const role = await prisma.role.findMany({
      include : { users : true,
        permission : true
    }
    });
    res.json(role)
  }catch(error){
    next(error)
  }
});

//role with id
router.get('/role/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const role = await prisma.role.findUnique({
      where : {
        id : Number(id) 
      },
      include : {
        users : true
      }
    },)

   res.json(role)

  }catch(error){
   next(error)
  }
  
});

//create role
router.post('/role', async (req, res, next) => {

  try{
    const { name, description } = req.body;
    console.log(req.body)
    const role = await prisma.role.create({
      data: {
       name,
       description
      }
    });
    res.json({role})
  }catch(error){
   next(error)
  }
  
});



router.delete('/role/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const user = await prisma.role.delete({
      where : {
        id : Number(id)
      }
    })
    res.send("role deleted")

  }catch(error){
   next(error)
  }
  
});

router.patch('/role/:id', async (req, res, next) => {
  try{
   const id = req.params.id;
   const data = req.body;
   const user = await prisma.role.update({
    where:{
      id : Number(id)
    },
    data :data,
   
   })
   res.json(user)
  }catch(error){
    next(error)
  }
});


module.exports = router;
