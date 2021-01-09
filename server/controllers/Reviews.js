import mongoose from 'mongoose';
const Review = mongoose.model('Review');

const createReview = (req, res) => {
    Review
        .create({
            title: req.body.title,
            ratings: req.body.ratings,
            comment: req.body.comment
        }, (err, reviewData) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(reviewData);
            }
        });
};

const getRatings = (req, res) => {
    Review
        .find({ title: req.params.bookid })
        .select({ ratings: 1 })
        .exec((err, reviewData) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }

            let len = reviewData.length;
            let ratings = 0;
            reviewData.forEach(r => {
                ratings += r.ratings;
            });
            ratings /= len;

            res
                .status(200)
                .json({ ratings: ratings });
        });
};

export default {
    createReview,
    getRatings
};