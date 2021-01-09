import mongoose from 'mongoose';
const Publisher = mongoose.model('Publisher');

const getPublishers = (req, res) => {
    Publisher
        .find()
        .sort([['name', 'ascending']])
        .exec((err, publisherData) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(publisherData);
        });
};

const createPublisher = (req, res) => {
    Publisher
        .create({
            name: req.body.name,
            city: req.body.city
        }, (err, publisherData) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(publisherData);
            }
        });
};

const getSinglePublisher = (req, res) => {
    Publisher
        .findById(req.params.publisherid)
        .exec((err, publisher) => {
            if (!publisher) {
                return res
                    .status(404)
                    .json({
                        "message": "Publisher not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(publisher);
        });
};

const updatePublisher = (req, res) => {
    if (!req.params.publisherid) {
        res.status(404)
            .json({
                "message": "Not found, Publisher ID is required"
            });
        return;
    }
    Publisher
        .findById(req.params.publisherid)
        .exec((err, publisherData) => {
            if (!publisherData) {
                res
                    .status(404)
                    .json({
                        "message": "Publisher ID not found."
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            publisherData.name = req.body.name;
            publisherData.city = req.body.city;
            publisherData.save((err, publisherData) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(publisherData);
                }
            });
        });
};

const deletePublisher = (req, res) => {
    const publisherID = req.params.publisherid;

    if (publisherID) {
        Publisher
            .findByIdAndRemove(publisherID)
            .exec((err, publisherData) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json({ "message": "Publisher Document deleted" });
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "No Publisher ID" });
    }
};

export default {
    getPublishers,
    createPublisher,
    getSinglePublisher,
    updatePublisher,
    deletePublisher
};