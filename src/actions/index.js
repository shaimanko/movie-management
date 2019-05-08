const actionTypes = {
	GET_RECORD: 'GET_RECORD',
	CREATE_RECORD: 'CREATE_RECORD',
	EDIT_RECORD: 'EDIT_RECORD',
	DELETE_RECORD: 'DELETE_RECORD'
}

const getRecord = () => ({
	type: actionTypes.GET_RECORD
})

const createRecord = formData => ({
	type: actionTypes.CREATE_RECORD,
	payload: formData
})

const editRecord = recordId => ({
	type: actionTypes.EDIT_RECORD,
	payload: recordId
})

const deleteRecord = recordId => ({
	type: actionTypes.DELETE_RECORD,
	payload: recordId
})

export default {
	getRecord,
	createRecord,
	editRecord,
	deleteRecord,
	actionTypes
}