import React from 'react'

import ArrowUp from '../image/arrow-up.png'
import ArrowDown from '../image/arrow-down.png'
import PageNotFound from '../image/image-not-found.jpg'

import './style.css'

class Table extends React.Component {
	render() {
		const { onSelectedItem, items, editSelectedItem, sortItems, title } = this.props

		return (
			<div className="table-container">
				<div className="table-title">
					<div>
						{title && title.length > 0 && title.map(item => (
							<div key={item.name} id={item.name} onClick={sortItems}>
								{item.name}
								{((item.name === 'Name' || item.name === 'Category' || item.name === 'Status') && items.length > 0) &&
									<span>
										{item.sort === 'ASC' ?
											<img src={ArrowDown} alt="" width="10px" height="10px" /> :
											<img src={ArrowUp} alt="" width="10px" height="10px" />
										}
									</span>
								}
							</div>
						))}
					</div>
				</div>
				<div className="table-record">
					{items && items.length > 0 && items.map(item => (
						<div key={item.id}>
							<div>
								<input type="checkbox" value={item.id} onClick={onSelectedItem} />
							</div>
							<div id={item.id} onClick={editSelectedItem}>
								<span>{item.id}</span>
							</div>
							<div id={item.id} onClick={editSelectedItem}>
								<img style={{ marginTop: '4px' }}
									src={(item.poster.endsWith("jpg") ||
										item.poster.endsWith("jpeg") ||
										item.poster.endsWith("gif") ||
										item.poster.endsWith("png") ||
										item.poster.endsWith("bmp")) ? item.poster : PageNotFound}
									alt="" width="100%" height="auto"
								/>
							</div>
							<div className="name-tag" id={item.id} onClick={editSelectedItem}>
								<span>{item.name}</span>
							</div>
							<div id={item.id} onClick={editSelectedItem}>
								<span>{item.category}</span>
							</div>
							<div id={item.id} onClick={editSelectedItem}>
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