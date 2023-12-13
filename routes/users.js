import express from 'express'
import { createOrUpdateUser, getAllUsers, getUser, deleteUser } from '../services/dynamodb'

const router = express.Router()

router.get('/', async (req, res) => {
  res.render('add');
});

router.get('/list', async (req, res) => {
  const { success, data } = await getAllUsers()
  // if (success) {
  //   console.log(data)
  //   // return res.json({ success, data })
  // }
  // return res.status(500).json({ success: false, message: 'Error Occured !!!'})
  // res.render('list');
  res.render('list',{_resp : data});
});

// GET ALL USERS
router.get('/users', async (req, res) => {
  const { success, data } = await getAllUsers()
  if (success) {
    console.log(data)
    res.render('list',{_resp : data});
    // return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// GET USER WITH ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const { success, data } = await getUser(id)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// CREATE NEW USER
router.post('/users', async (req, res) => {
  try {
    const { success, data } = await createOrUpdateUser(req.body)
    if (success) {
       res.render('list',{_resp : data});
       // return res.json({ success, data })
    }
  } catch (error) {
    console.log(error)
    // return res.status(500).json({ success: false, message: 'Error Occured !!!'})
  }
  
});

// UPDATE EXISTING USER
router.put('/users/:id', async (req, res) => {
  const user = req.body
  const { id } = req.params
  user.id = id

  const { success, data } = await createOrUpdateUser(user)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// DELETE USER
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const { success, data } = await deleteUser(id)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

export default router