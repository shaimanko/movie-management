import React from 'react'

import Button from './Button'
import Input from './Input'

import './style.css'

class Modal extends React.Component {
	render() {
		const { open, closeModal, submitModal, onChanged, submitType, formData } = this.props

		return (
			<div className={`backdrop ${open ? "show" : "hide"}`}>
				<div className="modal-container">
					<div className="title-section">
						<h2>{submitType === 'create' ? 'Create Item' : 'Edit Item'}</h2>
					</div>
					<div className="form-section">
						<form className="form-component">
							<Input label="Poster" name="poster" onChange={onChanged} value={formData.poster} />
							<Input label="Movie Name" name="name" onChange={onChanged} value={formData.name} />
							<Input label="Synopsis" name="synopsis" onChange={onChanged} value={formData.synopsis} />
							<Input label="Category" name="category" onChange={onChanged} value={formData.category} />
							<Input label="Status" name="status" onChange={onChanged} value={formData.status} />
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