import React from 'react'
import { connect } from 'react-redux'

import actions from './actions'

import Button from './components/Button'
import Input from './components/Input'
import Modal from './components/Modal'
import Table from './components/Table'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      title: [
        { name: '', sort: 'ASC' },
        { name: '#', sort: 'ASC' },
        { name: 'Poster', sort: 'ASC' },
        { name: 'Name', sort: 'ASC' },
        { name: 'Category', sort: 'ASC' },
        { name: 'Status', sort: 'ASC' },
      ],
      formData: {
        poster: '',
        name: '',
        category: '',
        status: '',
        synopsis: ''
      },
      editItem: null,
      deleteItems: [],
      open: false,
      filterCategory: '',
      filterStatus: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.generateItems()
  }

  generateItems = async () => {
    await this.props.getRecord()

    if (this.props.response === 'SUCCESS') {
      this.setState({
        items: this.props.items,
        filterCategory: '',
        filterStatus: ''
      })
    }
  }

  handleDelete = async () => {
    const { deleteItems } = this.state

    await this.props.deleteRecord(deleteItems)

    if (this.props.response === 'SUCCESS') this.generateItems()
  }

  handleClick = (e) => {
    const { deleteItems } = this.state
    const value = e.target.value
    let checkExist = false
    let newItems = deleteItems

    if (newItems) {
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i] === value) {
          checkExist = true
          newItems.splice(i, 1)
        }
      }
    }
    if (!checkExist) {
      newItems.push(value)
    }
    this.setState({
      deleteItems: newItems
    })
  }

  handleEditModal = (e) => {
    const recordId = e.currentTarget.id
    const { items } = this.props
    let pos

    for (let i in items) {
      if (items[i].id === parseInt(recordId)) {
        pos = i
      }
    }

    this.setState({
      open: true,
      editItem: recordId,
      formData: {
        poster: pos ? items[pos].poster : '',
        name: pos ? items[pos].name : '',
        category: pos ? items[pos].category : '',
        status: pos ? items[pos].status : '',
        synopsis: pos ? items[pos].synopsis : ''
      }
    })
  }

  handleModal = () => {
    const { open } = this.state

    this.setState({
      open: !open,
      editItem: null,
      formData: {
        poster: '',
        name: '',
        category: '',
        status: '',
        synopsis: ''
      },
    })
  }

  onFieldChanged = (e) => {
    const { formData } = this.state

    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value
      }
    })
  }

  onFilterChanged = (e) => {
    const searchName = e.target.name
    const searchInput = e.target.value
    const { filterCategory, filterStatus } = this.state
    const { items } = this.props
    const newItems = [], recheckItems = []

    if (searchName === 'filter-category') {
      if (searchInput) {
        if (filterStatus) {
          for (let i in items) {
            if (items[i].status.includes(filterStatus)) {
              recheckItems.push(items[i])
            }
          }
          for (let j in recheckItems) {
            if (recheckItems[j].category.includes(searchInput)) {
              newItems.push(recheckItems[j])
            }
          }
        } else {
          for (let i in items) {
            if (items[i].category.includes(searchInput)) {
              newItems.push(items[i])
            }
          }
        }
        this.setState({
          items: newItems,
          filterCategory: searchInput
        })
      } else {
        if (filterStatus) {
          for (let i in items) {
            if (items[i].status.includes(filterStatus)) {
              newItems.push(items[i])
            }
          }
          this.setState({
            items: newItems,
            filterCategory: ''
          })
        } else {
          this.setState({
            items,
            filterCategory: ''
          })
        }
      }
    } else if (searchName === 'filter-status') {
      if (searchInput) {
        if (filterCategory) {
          for (let i in items) {
            if (items[i].category.includes(filterCategory)) {
              recheckItems.push(items[i])
            }
          }
          for (let j in recheckItems) {
            if (recheckItems[j].status.includes(searchInput)) {
              newItems.push(recheckItems[j])
            }
          }
        } else {
          for (let i in items) {
            if (items[i].status.includes(searchInput)) {
              newItems.push(items[i])
            }
          }
        }
        this.setState({
          items: newItems,
          filterStatus: searchInput
        })
      } else {
        if (filterCategory) {
          for (let i in items) {
            if (items[i].category.includes(filterCategory)) {
              newItems.push(items[i])
            }
          }
          this.setState({
            items: newItems,
            filterStatus: ''
          })
        } else {
          this.setState({
            items,
            filterStatus: ''
          })
        }
      }
    }
  }

  onSortItems = (e) => {
    const sortField = e.currentTarget.id
    const { items, title } = this.state

    if (sortField === 'Name') {
      for (let i in title) {
        if (sortField === title[i].name) {
          if (title[i].sort === 'DESC') {
            items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            title[i].sort = 'ASC'
          } else if (title[i].sort === 'ASC') {
            items.sort((a, b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0))
            title[i].sort = 'DESC'
          }
        }
      }
      
    } else if (sortField === 'Category') {
      for (let i in title) {
        if (sortField === title[i].name) {
          if (title[i].sort === 'DESC') {
            items.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0))
            title[i].sort = 'ASC'
          } else if (title[i].sort === 'ASC') {
            items.sort((a, b) => (b.category > a.category) ? 1 : ((a.category > b.category) ? -1 : 0))
            title[i].sort = 'DESC'
          }
        }
      }
    } else if (sortField === 'Status') {
      for (let i in title) {
        if (sortField === title[i].name) {
          if (title[i].sort === 'DESC') {
            items.sort((a, b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0))
            title[i].sort = 'ASC'
          } else if (title[i].sort === 'ASC') {
            items.sort((a, b) => (b.status > a.status) ? 1 : ((a.status > b.status) ? -1 : 0))
            title[i].sort = 'DESC'
          }
        }
      }
    }

    this.setState({
      items,
      title
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { formData, editItem } = this.state

    if (editItem) await this.props.editRecord(editItem, formData)
    else await this.props.createRecord(formData)

    if (this.props.response === 'SUCCESS') {
      this.generateItems()
      this.handleModal()
    }
  }

  render() {
    const { open, formData, editItem, items, title } = this.state

    return (
      <div className="movie-container">
        <header>
          <div className="filter-section">
            <Input label="Status: " placeholder="Status Search..." name="filter-status" onChange={this.onFilterChanged} />
          </div>
          <div className="filter-section">
            <Input label="Category: " placeholder="Category Search..." name="filter-category" onChange={this.onFilterChanged} />
          </div>
          <Button className="add-button" onClick={this.handleModal}>
            <span>Add</span>
          </Button>
          <Button className="delete-button" onClick={this.handleDelete}>
            <span>Delete</span>
          </Button>
        </header>
        <div className="table-section">
          <Table
            title={title}
            items={items}
            editSelectedItem={this.handleEditModal}
            onSelectedItem={this.handleClick}
            sortItems={this.onSortItems}
          />
        </div>
        <Modal
          open={open}
          closeModal={this.handleModal}
          formData={formData}
          submitType={editItem !== null ? 'edit' : 'create'}
          onChanged={this.onFieldChanged}
          submitModal={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getRecord: () => dispatch(actions.getRecord()),
  createRecord: formData => dispatch(actions.createRecord(formData)),
  editRecord: (id, formData) => dispatch(actions.editRecord(id, formData)),
  deleteRecord: id => dispatch(actions.deleteRecord(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
