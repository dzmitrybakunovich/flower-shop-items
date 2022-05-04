const {Review} = require('../models/models');

class ReviewController {

    async create(req, res) {
        try {
            const {content, mark, item_id, writer_id} = req.body
            // const {owner} = (await Item.findOne({where: {it_id: item_id}})).getDataValue('it_owner')
            const type = await Review.create({
                re_content: content,
                re_mark: mark,
                re_writer: writer_id,
                itemItId: item_id,
            })
            return res.json(type)
        } catch (e) {
            console.log(e)
        }
    }


    async delete(req, res) {
        try {
            const {id} = req.body
            const answer = await Review.destroy({where: {re_id: id}})
            return res.json(answer)
        } catch (e) {
            console.log(e)
        }
    }


    async getAll(req, res) {
        const {id} = req.query
        let review
        if (id) {
            review = await Review.findAll({where: {itemItId: id}})
        } else {
            review = await Review.findAll()
        }
        return res.json(review)
    }

    // async getAllForOne(req, res){
    //
    // }
}

module.exports = new ReviewController()