const express = require('express');
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.render('main', { rooms, title: '익명 채팅방' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/room', (req, res) => {
  res.render('room', { title: '익명 채팅방 생성' });
});

router.post('/room', async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      owner: req.session.color,
    });
    const io = req.app.get('io');
    io.of('/room').emit('newRoom', newRoom);
    res.redirect(`/room/${newRoom._id}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/room/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    const io = req.app.get('io');
    if (!room) {
      return res.redirect('/?error=존재하지 않는 방입니다.');
    }

    const chats = await Chat.find({ room: room._id }).sort('createdAt');
    return res.render('chat', {
      room,
      title: room.title,
      chats,
      user: req.session.color,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.delete('/room/:id', async (req, res, next) => {
  try {
    await Room.remove({ _id: req.params.id });
    await Chat.remove({ room: req.params.id });

    res.send('ok');
    setTimeout(() => {
      req.app.get('io').of('/room').emit('removeRoom', req.params.id);
    }, 2000);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/room/:id/chat', async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      chat: req.body.chat,
    });

    req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
