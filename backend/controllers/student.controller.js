const express = require('express');
const app = express();
const Student = require('../models/students.model');
const mongoose = require('mongoose');

exports.getAll = (req, res, next) => {
  const query = req.query || {};
  Student.find(query).then(students => {
    res.send(students);
  }).catch(err => next(err))
}

exports.create = (req, res, next) => {
  const student = new Student(req.body)
  student.save().then(student => {
    res.send(student)
  }).catch(err => next(err))
}

exports.getOne = (req, res, next) => {
  Student.findById(req.params.studentId).then(student => {
    res.send(student);
  }).catch(err => next(err))
}

exports.update = (req, res, next) => {
  const generateId = new mongoose.Types.ObjectId();
  const query = req.params.studentId;

  Student.findById(req.params.studentId).exec((err, doc) => {
    Student.updateOne({
        _id: doc ? query : generateId
      }, {
        email: req.body.email,
        name: req.body.name,
        address: {
          gata: req.body.address.gata,
          postnummer: req.body.address.postnummer,
          ort: req.body.address.ort,
        }
      }, {
        new: true,
        upsert: true,
        runValidators: true
      })
      .then(student => {
        student.upserted ? res.status(201).send({
          message: "New student created"
        }) : (student.nModified ? res.status(200).send({
          message: "Student was updated"
        }) : res.status(200).send({
          message: "No student was created or updated"
        }))
      }).catch(err => next(err))
  })
};

exports.delete = (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId).then(deleted => {
    deleted ? res.status(200).send({
      message: "Student deleted successfully"
    }) : res.sendStatus(204)
  }).catch(err => next(err))
}
