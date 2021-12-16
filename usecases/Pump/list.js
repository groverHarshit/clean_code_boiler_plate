class list {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(list.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!filter.latitude || !filter.longitude) {
                    throw new Error("Latitude and Longitude are required");
                }
                const skip = filter.pageNo && filter.pageLength ? (parseInt(filter.pageNo) - 1) * parseInt(filter.pageLength) : 0;
                const limit = parseInt(filter.pageLength) || 10;
                const sort = filter.sort || { createdAt: -1 };
                const pipeline = [];

                pipeline.push({
                    $geoNear: {
                        near: { type: "Point", coordinates: [parseFloat(filter.longitude), parseFloat(filter.latitude)] },
                        distanceField: "dist.calculated",
                        includeLocs: "dist.location",
                        maxDistance: 5000000000000000,
                        spherical: true,
                    }
                });

                if (filter.name) {
                    pipeline.push({
                        $match: {
                            name: filter.name,
                        }
                    });
                }

                if (filter.filling_types) {
                    pipeline.push({
                        $match: {
                            filling_types: {
                                $all: filter.filling_types,
                            }
                        }
                    })
                }
                pipeline.push({
                    $sort: sort,
                })

                pipeline.push({
                    $project: {
                        '_id': '$_id',
                        'name': '$name',
                        'location': '$location',
                        'filling_types': '$filling_types',
                        'createdAt': '$createdAt',
                        'updatedAt': '$updatedAt'
                    }
                });

                pipeline.push({
                    $skip: skip
                });

                pipeline.push({
                    $limit: limit
                });

                pipeline.push({
                    $count: 'count'
                })
                const { payload, count } = await this.gateways.pumpGateway.aggregate(pipeline);

                resolve({ pumps: payload, count })
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = list;
