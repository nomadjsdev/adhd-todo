import db from 'Db'

export const fetchAll = async (tables) => {
	const data = {}

	for (const table of tables) {
		await fetchFromDb({ table: table.name, order: table.order }).then(
			(response) => {
				data[table.name] = response
			},
		)
	}

	return data
}

export const fetchFromDb = ({ table, order }) => {
	if (order) {
		return db.table(table).orderBy(order).toArray()
	}

	return db.table(table).toArray()
}

export const putInDb = ({ table, data, isBulk }) => {
	if (isBulk) {
		return db.table(table).bulkPut(data)
	}

	return db.table(table).put(data)
}

export const updateDb = ({ table, id, data }) => {
	return db.table(table).update(id, data)
}

export const deleteFromDb = ({ table, id, filter }) => {
	if (filter) {
		return db.table(table).where(filter).equals(id).delete()
	}

	return db.table(table).delete(id)
}

export const reinitDb = () => {
	return db.delete().then(() => db.open())
}
