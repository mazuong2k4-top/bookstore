const Genre = require('../models/genres.model')
const Book = require('../models/books.model')

const genreService = {
    getAll: async({query, page, limit, sort}) => {
        const skip = (page - 1) * limit
        return await Promise.all([Genre.countDocuments({}), Genre.find({}).skip(skip).limit(limit).sort(sort)])
    },
    getById: async(id) => {
        return await Genre.findById(id)
    },
    getBySlug: async(slug) => {
        return await Genre.findOne({slug})
    },
    create: async({name}) => {
        const newGenre = new Genre({name})
        return await newGenre.save()
    },
    updateById: async(id, {name}) => {
        return await Genre.findByIdAndUpdate(id, { name: name }, {new: true})
    },
    deleteById: async(id) => {

        await Book.updateMany({genre: id}, {
            $pull: { genre: id }
        })
        return await Genre.findByIdAndDelete(id)
    }
}

module.exports = genreService
