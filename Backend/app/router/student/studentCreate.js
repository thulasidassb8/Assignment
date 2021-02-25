'use strict';

const express = require('express');
const router = express.Router();


const Student = require('../../model/student/createStudent');




router.route('/create')
    .post(async(req, res, next) => {
        try {
            const { body } = req;
            const studentDetails = new Student(body);
            const result = await studentDetails.save();
            if (result) {
                res.status(200).json({
                    data: result,
                    message: 'Successfully Created'
                })
            }
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
    try {
        const { body } = req;
        if (body._id) {
            const findResult = await Student.find({ _id: body._id });
            if (findResult) {
                const result = await Student.findByIdAndUpdate({ _id: body._id }, body, { new: true });
                if (result) {
                    res.status(200).json({
                        data: result,
                        message: 'Successfully Updated'
                    })
                }
            }
        } else {
            res.status(200).json({
                message: '_id is needed'
            })
        }
    } catch (error) {
        next(error);
    }
})




router.route('/')
    .get(async(req, res, next) => {
        try {
            const result = await Student.find({}).lean();
            if (result) {
                res.status(200).json({
                    data: result,
                    status: 1
                })
            } else {
                res.status(200).json({
                    data: result,
                    status: 1
                })
            }
        } catch (error) {
            next(error);
        }
    })



router.route('/:id')
    .get(async(req, res, next) => {
        try {
            const { id } = req.params;
            if (id) {
                const result = await Student.find({ _id: id });
                if (result) {
                    res.status(200).json({
                        data: result,
                        status: 1
                    })
                } else {
                    res.status(200).json({
                        data: result,
                        status: 1
                    })
                }
            }
        } catch (error) {
            next(error);
        }
    })


module.exports = router;