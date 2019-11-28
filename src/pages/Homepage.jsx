import React, { Component } from "react";
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// const Swal = withReactContent(Swal);
class Homepage extends Component {
  state = {
    data: [],
    isOpen: false,
    indexEdit: -1
  };

  componentDidMount() {
    this.setState({
      data: [
        { activity: "Run", date: "2019-11-28", status: true },
        { activity: "Brunch", date: "2019-11-28", status: false },
        { activity: "Singing", date: "2019-11-28", status: false },
        { activity: "Read", date: "2019-11-28", status: false }
      ]
    });
  }

  addTodo = () => {
    var activity = this.refs.activity.value;
    var date = this.refs.date.value;
    var obj = {
      activity,
      status: false,
      date
    };

    if (activity === "" || date === "") {
      Swal.fire("Oops...", "Activity and Date should be added!", "error");
    } else {
      var newData = [...this.state.data, obj];
      this.setState({ data: newData, isOpen: false });
    }
  };

  delTodo(index) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.state.data.splice(index, 1);
        this.setState({ data: data });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
    const data = this.state.data.filter(data => data.index !== index);
    this.setState({ data });
  }

  editTodo = index => {
    this.setState({ indexEdit: index });
  };

  cancel = () => {
    this.setState({ indexEdit: -1 });
  };

  save = index => {
    var activity = this.refs.activity.value;
    var date = this.refs.date.value;
    var status = this.refs.status.value === "Done" ? true : false;
    var obj = {
      activity,
      date,
      status
    };
    this.state.data.splice(index, 1, obj);
    this.setState({ indexEdit: -1 });
    // console.log(this.state.data);
  };

  renderTodo = () => {
    return this.state.data.map((val, index) => {
      if (index === this.state.indexEdit) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input ref="activity" type="text" defaultValue={val.activity} />
            </td>
            <td>
              <input ref="date" type="date" defaultValue={val.date} />
            </td>
            <td>
              {val.status ? (
                <select ref="status">
                  <option selected>Done</option>
                  <option>Pending</option>
                </select>
              ) : (
                <select ref="status">
                  <option>Done</option>
                  <option selected>Pending</option>
                </select>
              )}
            </td>
            <td>
              <button
                onClick={() => this.save(index)}
                className="btn btn-primary mr-2"
              >
                Save
              </button>
              <button onClick={() => this.cancel()} className="btn btn-danger">
                Cancel
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val.activity}</td>
            <td>{val.date}</td>
            <td>{val.status ? "Done" : "Pending"}</td>
            <td>
              <button
                onClick={() => this.editTodo(index)}
                className="btn btn-primary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => this.delTodo(index)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      }
    });
  };

  render() {
    return (
      <div className="mt-3 mx-3 my-3 px-3">
        {/*===== MODAL ADD TODO =====*/}
        <Modal
          isOpen={this.state.isOpen}
          toggle={() => this.setState({ isOpen: true })}
        >
          <ModalHeader>Add Todo</ModalHeader>
          <ModalBody>
            <label> Activity: </label>
            <input
              className="form-control"
              placeholder="Activity"
              type="text"
              ref="activity"
            />
            <br></br>
            <label> Date: </label>
            <input
              className="form-control"
              placeholder="Date"
              type="date"
              ref="date"
            />
          </ModalBody>
          <ModalFooter>
            <button onClick={this.addTodo} className="btn btn-primary">
              Add
            </button>
            <button
              onClick={() => this.setState({ isOpen: false })}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        {/*===== MODAL ADD TODO END =====*/}

        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Activity</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTodo()}</tbody>
        </Table>
        <div>
          <button
            onClick={() => this.setState({ isOpen: true })}
            className="btn btn-success rounded-pill px-4 py-2"
          >
            Add Todo
          </button>
        </div>
      </div>
    );
  }
}

export default Homepage;
