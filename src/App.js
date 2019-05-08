import React from 'react'
import { connect } from 'react-redux'

import actions from './actions'

import Button from './components/Button'
import Modal from './components/Modal'
import Table from './components/Table'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {
        poster: '',
        name: '',
        category: '',
        status: ''
      },
      editItem: null,
      deleteItems: [],
      open: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this)
  }

  componentWillMount() {
    this.generateItems()
  }

  generateItems = async () => {
    await this.props.getRecord()
  }

  handleDelete = async () => {
    const { deleteItems } = this.state

    await this.props.deleteRecord(deleteItems)

    this.generateItems()
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

    this.setState({
      editItem: recordId
    })

    this.handleModal()
  }

  handleModal = () => {
    const { open, editItem } = this.state
    this.setState({
      open: !open,
      editItem: open === false ? null : editItem
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

  handleSubmitCreate = async (e) => {
    e.preventDefault()

    const { formData } = this.state

    await this.props.createRecord(formData)

    this.generateItems()
    this.handleModal()
  }

  render() {
    const { open, formData, editItem } = this.state
    const { items } = this.props

    return (
      <div className="movie-container">
        <header>
          <Button className="add-button" onClick={this.handleModal}>
            <span>Add</span>
          </Button>
          <Button className="delete-button" onClick={this.handleDelete}>
            <span>Delete</span>
          </Button>
        </header>
        <div className="table-section">
          <Table
            items={items}
            editSelectedItem={this.handleEditModal}
            onSelectedItem={this.handleClick}
          />
        </div>
        <Modal
          open={open}
          closeModal={this.handleModal}
          items={items}
          submitType={editItem !== null ? 'edit' : 'create'}
          editItem={editItem}
          onChanged={this.onFieldChanged}
          submitModal={this.handleSubmitCreate}
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
  editRecord: id => dispatch(actions.editRecord(id)),
  deleteRecord: id => dispatch(actions.deleteRecord(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
