import React from 'react'

import Button from './Button'
import Input from './Input'

import './style.css'

class Modal extends React.Component {
	render() {
		const { open, closeModal, submitModal, onChanged, submitType, items, editItem } = this.props
		let pos
		console.log(editItem, open)
		for (let i in items) {
			if (items[i].id === parseInt(editItem)) {
				pos = i
			}
		}

		return (
			<div className={`backdrop ${open ? "show" : "hide"}`}>
				<div className="modal-container">
					<div className="title-section">
						<h2>{submitType === 'create' ? 'Create Item' : 'Edit Item'}</h2>
					</div>
					<div className="form-section">
						<form className="form-component">
							<Input label="Poster" name="poster" onChange={onChanged} value={editItem !== null ? items[pos].poster : ''} />
							<Input label="Name" name="name" onChange={onChanged} value={editItem !== null ? items[pos].name : ''} />
							<Input label="Category" name="category" onChange={onChanged} value={editItem !== null ? items[pos].category : ''} />
							<Input label="Status" name="status" onChange={onChanged} value={editItem !== null ? items[pos].status : ''} />
						</form>
					</div>
					<div className="button-section">
						<Button className="delete-button" onClick={closeModal}>
							<span>Cancel</span>
						</Button>
						<Button className="add-button" onClick={submitModal}>
							<span>Confirm</span>
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default Modal