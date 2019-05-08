import actions from '../actions'

const mockupData = [
	{ 'id': 1, 'poster': 'https://assets.saatchiart.com/saatchi/484210/art/4332623/3402463-KNVHBTVS-7.jpg', 'name': 'test', 'category': 'test', 'status': 'test' },
	{ 'id': 2, 'poster': 'https://assets.saatchiart.com/saatchi/484210/art/4332623/3402463-KNVHBTVS-7.jpg', 'name': 'test', 'category': 'test', 'status': 'test' },
]

localStorage.setItem('items', JSON.stringify(mockupData))

const initialState = {
	items: []
}

export default (state = initialState, action) => {
	const newItems = state.items
	const event = action.payload
	switch (action.type) {
		case actions.actionTypes.GET_RECORD:
			const items = JSON.parse(localStorage.getItem('items'))
			return {
				...state,
				items
			}
		case actions.actionTypes.CREATE_RECORD:
			event.id = newItems[newItems.length-1].id + 1
			newItems.push(event)
			localStorage.setItem('items', JSON.stringify(newItems))
			return {
				...state
			}
		case actions.actionTypes.EDIT_RECORD:
			return {
				...state
			}
		case actions.actionTypes.DELETE_RECORD:
			for (let i = 0; i < newItems.length; i++) {
				for (let j = 0; j < event.length; j++) {
					if (newItems[i].id === parseInt(event[j])) {
						newItems.splice(i, 1)
					}
				}
			}
			localStorage.setItem('items', JSON.stringify(newItems))
			return {
				...state
			}
		default:
			return state
	}
}