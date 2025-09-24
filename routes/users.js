import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Udah di user bang")
})

export default router;