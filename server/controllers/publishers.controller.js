const publisherService = require('../services/publishers.service')

const publisherController = {
    getAll: async (req, res) => {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const limit = req.query.limit ? parseInt(req.query.limit) : 0
        const sortByDate = req.query.sortByDate

        let sort = {}
        if (sortByDate) sort.createdAt = sortByDate === "asc" ? 1 : -1

        const [count, data] = await publisherService.getAll({ page, limit, sort })
        const totalPage = Math.ceil(count / limit)

        res.status(200).json({
            message: 'success',
            error: 0,
            count,
            data,
            pagination: {
                page,
                limit,
                totalPage,
            }
        })
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const data = await publisherService.getById(id)
            if (data) {
                res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                })
            } else {
                res.status(404).json({
                    message: 'Không tìm thấy Nhà xuất bản!',
                    error: 1,
                    data
                })
            }
        } catch (error) {
            res.status(500).json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    create: async (req, res) => {
        try {
            const data = await publisherService.create(req.body)
            res.status(201).json({
                message: 'success',
                error: 0,
                data
            })
        } catch (error) {
            res.status(400).json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    updateById: async (req, res) => {
        try {
            const { id } = req.params
            const data = await publisherService.updateById(id, req.body)
            if (data) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                })
            } else {
                return res.status(404).json({
                    message: `Không tìm thấy NXB có id:${id}`,
                    error: 1,
                    data
                })
            }

        } catch (error) {
            res.status(400).json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    deleteById: async (req, res) => {
        try {
            const { id } = req.params
            const data = await publisherService.deleteById(id)
            if (data) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                })
            } else {
                return res.status(404).json({
                    message: `Không tìm thấy NXB có id:${id}`,
                    error: 1,
                    data
                })
            }

        } catch (error) {
            res.status(400).json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    }
}

module.exports = publisherController
