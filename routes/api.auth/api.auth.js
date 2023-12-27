const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


//signup route
router.post('/signup', async (req, res, next) => {
  try{
    let { firstname, lastname, email, password, roleId, status } = req.body;
    password = await bcrypt.hash(password,10);
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
    res.status(200).json({'message' : "user signed up"});
  }catch(error){
   next(error)
  }
  
});

router.post('/login',async(req,res,next)=>{

    try{
    const {email , password} = req.body;
    const user = await prisma.users.findUnique({
    where :{
        email : email
    },
    include :{
       Role : true
    }
   })
   if(!user){
    return res.status(401).json({message : 'authentication failed'})
   }

   const matchedpassword = await bcrypt.compare(password,user.password)
   if(!matchedpassword){
     return res.status(401).json({message : 'Invalid credentials'})
   }

   const token = jwt.sign({userId : user.id}, "secret-key", { expiresIn: '1h' })
   
    res.json({token})
  }catch(error){
   next(error)
  }
})



module.exports = router;
