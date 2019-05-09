import actions from '../actions'

/*const mockupData = [
	{
		'id': 1,
		'poster': 'https://assets.saatchiart.com/saatchi/484210/art/4332623/3402463-KNVHBTVS-7.jpg',
		'name': 'a',
		'category': 'z',
		'status': 'a',
		'synopsis': 'z'
	},
	{
		'id': 2,
		'poster': 'http://static.boredpanda.com/blog/wp-content/uploads/2017/02/IMG_20160928_211518-58a01288a7483__880.jpg',
		'name': 'z',
		'category': 'b',
		'status': 'z',
		'synopsis': 'b'
	},
]*/

// localStorage.setItem('items', JSON.stringify(mockupData))

const initialState = {
	items: [],
	response: null
}

export default (state = initialState, action) => {
	const newItems = state.items
	const newEvent = action.payload
	switch (action.type) {
		case actions.actionTypes.GET_RECORD:
			const items = JSON.parse(localStorage.getItem('items'))
			return {
				...state,
				items,
				response: 'SUCCESS'
			}
		case actions.actionTypes.CREATE_RECORD:
			if (newItems.length > 0) newEvent.id = newItems[newItems.length - 1].id + 1
			else newEvent.id = 1
			newItems.push(newEvent)
			localStorage.setItem('items', JSON.stringify(newItems))
			return {
				...state,
				response: 'SUCCESS'
			}
		case actions.actionTypes.EDIT_RECORD:
			for (let i in newItems) {
				if (newItems[i].id === parseInt(newEvent.editItem)) {
					newItems[i].poster = newEvent.formData.poster
					newItems[i].name = newEvent.formData.name
					newItems[i].category = newEvent.formData.category
					newItems[i].status = newEvent.formData.status
					newItems[i].synopsis = newEvent.formData.synopsis
				}
			}
			localStorage.setItem('items', JSON.stringify(newItems))
			return {
				...state,
				response: 'SUCCESS'
			}
		case actions.actionTypes.DELETE_RECORD:
			for (let i = 0; i < newItems.length; i++) {
				for (let j = 0; j < newEvent.length; j++) {
					if (newItems[i].id === parseInt(newEvent[j])) {
						newItems.splice(i, 1)
					}
				}
			}
			localStorage.setItem('items', JSON.stringify(newItems))
			return {
				...state,
				response: 'SUCCESS'
			}
		default:
			return state
	}
}