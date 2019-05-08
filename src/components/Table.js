import React from 'react'

import './style.css'

class Table extends React.Component {
	render() {
		const { onSelectedItem, items, editSelectedItem } = this.props

		return (
			<div className="table-container">
				<div className="table-title">
					<div>
						<div></div>
						<div>#</div>
						<div>Poster</div>
						<div>Name</div>
						<div>Category</div>
						<div>Status</div>
					</div>
				</div>
				<div className="table-record">
					{items.length > 0 && items.map(item => (
						<div key={item.id} id={item.id} onClick={editSelectedItem}>
							<div>
								<input type="checkbox" value={item.id} onClick={onSelectedItem} />
							</div>
							<div>
								<span>{item.id}</span>
							</div>
							<div>
								<img style={{ marginTop: '4px' }} src={item.poster} alt={item.name} width="100%" height="auto" />
							</div>
							<div className="name-tag">
								<span>{item.name}</span>
							</div>
							<div>
								<span>{item.category}</span>
							</div>
							<div>
								<span>{item.status}</span>
							</div>
						</div>
					))}
					{items.length === 0 &&
						<div className="table-no-content">
							<span>No Content</span>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default Table