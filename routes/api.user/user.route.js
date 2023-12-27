const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


// get all users
router.get('/users', async (req, res, next) => {
  try{
      const users = await prisma.users.findMany({
      include : { Role : true}
    });
    res.json(users)
  }catch(error){
    next(error)
  }
});

//users with id
router.get('/user/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const user = await prisma.users.findUnique({
      where : {
        id : Number(id) 
      },
      include : {
        Role : true
      }
    },)

   res.json(user)

  }catch(error){
   next(error)
  }
  
});

//create users
router.post('/users', async (req, res, next) => {
  try{
    const { firstname, lastname, email, password, roleId, status } = req.body;
    console.log(req.body)
    const user = await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password,
        status,
        Role: { connect: { id: roleId } } // Connects the user to the specified role
      }
    });
    res.json({data})
  }catch(error){
   next(error)
  }
  
});



router.delete('/user/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const user = await prisma.users.delete({
      where : {
        id : Number(id)
      }
    })
    res.send("user deleted")

  }catch(error){
   next(error)
  }
  
});

router.patch('/user/:id', async (req, res, next) => {
  try{
   const Id = req.params.id;
   const { roleId,feild ,value} = req.body;
   console.log(feild)
   let updatebody ={};
   if(roleId){
    updatebody={
      Role: { connect: { id: roleId } }
    }
   }
  if(feild && value){
    updatebody[feild]=value;
   }
    else {
      return res.status(400).json({ error: 'Invalid request' });
    }
    // console.log(updatebody,feild,value)
   
   const user = await prisma.users.update({
    where:{
      id : Number(Id)
    },
    data: updatebody,
   
   })
   res.json(user)
  }catch(error){
    next(error)
  }
});


module.exports = router;
