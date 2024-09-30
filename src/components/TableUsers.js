import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import { Button } from 'react-bootstrap';
import ModalEditUser from './ModalEditUser';
import _, { cloneDeep, constant } from 'lodash'
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleUpdateUser = (user) => {
        setListUsers([user, ...listUsers])
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        cloneListUsers[index].last_name = user.last_name;
        cloneListUsers[index].email = user.email;
        setListUsers(cloneListUsers)
    }

    const handleConfirmDeletefromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUsers(cloneListUsers);
        console.log("check list", listUsers)
    }

    const [isShow, setIsShow] = useState(false);
    const handleClose = () => setIsShow(false);
    const handleShow = () => setIsShow(true);

    const [isEditShow, setIsEditShow] = useState(false);
    const handleEditUserClose = () => setIsEditShow(false);

    const handleEditUserShow = (user) => {
        setIsEditShow(true);
        setDataUserEdit(user)
    }

    const [isModalDeleteShow, setIsDeleteShow] = useState(false);
    const handleModalDeleteClose = () => setIsDeleteShow(false)

    const handleDeleteUserShow = (user) => {
        setIsDeleteShow(true);
        setDataUserDelete(user)
        console.log(user)
    }

    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [dataExport, setDataExport] = useState("")
    const getDataExport = () => {
        let resutl = [];
        resutl.push(["ID", "First Name", "Last Name", "Email"]);
        if (listUsers && listUsers.length > 0) {
            listUsers.map((val, index) => {
                let arr = [];
                arr[0] = val.id
                arr[1] = val.first_name
                arr[2] = val.last_name
                arr[3] = val.email
                resutl.push(arr);
            })
            setDataExport(resutl);
        }
    }


    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)
        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers)

        //console.log("check sort:  ", sortBy, sortField, cloneListUsers)
    }

    useEffect(() => {
        getUsers();
    }, [])


    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
            setTotalUsers(res.total);
            setTotalPages(res.total_pages)
            console.log(res)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleSearch = (event) => {
        let term = event.target.value
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers)
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUsers(cloneListUsers)
        }

        else { getUsers() }
    }

    const handleImportCSV = (event) => {

        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files && event.target.files[0]
            if (file.type !== "text/csv") {
                toast.error("Only CSV file ...")
            }

            Papa.parse(file, {
                //header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV && rawCSV.length < 0) {
                        toast.error("No data found in CSV file ...")
                    }
                    else {
                        if (rawCSV[0] && rawCSV[0].length === 4) {
                            if (rawCSV[0][0] !== "ID"
                                || rawCSV[0][1] !== "First Name"
                                || rawCSV[0][2] !== "Last Name"
                                || rawCSV[0][3] !== "Email"
                            ) {
                                toast.error("Wrong header's format in CSV file!")
                            } else {

                                let result = []
                                rawCSV.map((val, index) => {
                                    if (index > 0 && val.length === 4) {
                                        let obj = {};
                                        obj.id = val[0];
                                        obj.first_name = val[1];
                                        obj.last_name = val[2];
                                        obj.email = val[3];
                                        result.push(obj)
                                    }
                                })
                                console.log("check result>>>", result)
                                setListUsers(result)
                            }
                        }
                        toast.success("imported a file successfully")
                    }
                    console.log("Finished:", results.data);
                }
            });
        }
        else {
            console.log("looix")
        }




    }

    return (<>

        <div className='add-user'>
            <span><b>List users: </b></span>
            <div>
                <label htmlFor='test' className='btn btn-warning me-2 text-white'>
                    <i className="fa-solid fa-upload me-2"></i>
                    Import
                    <input
                        onChange={(event) => handleImportCSV(event)}
                        type='file' id='test' hidden></input>
                </label>

                <CSVLink
                    filename={"users.csv"}
                    className="btn btn-primary me-2"
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getDataExport}>
                    <i className="fa-solid fa-download me-2"></i>

                    Export
                </CSVLink>

                <button className='btn btn-success'
                    onClick={handleShow}>
                    <i className="fa-solid fa-circle-plus me-2"></i>
                    Add new
                </button>
            </div>
        </div>

        <div className='col-4 my-3 m-auto' >
            <input type='text'

                onChange={handleSearch}
                className='form-control' placeholder='Search user by email ...'></input>

        </div>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className='sort-header'>
                            <span> First Name </span>
                            <span>
                                <i
                                    onClick={() => handleSort("desc", "id")}
                                    className="fa-solid fa-down-long"></i>

                                <i
                                    onClick={() => handleSort("asc", "id")}
                                    className="fa-solid fa-up-long"></i>
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>
                            Email
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>
                            <span> First Name </span>
                            <span>
                                <i
                                    onClick={() => handleSort("desc", "first_name")}
                                    className="fa-solid fa-down-long"></i>

                                <i
                                    onClick={() => handleSort("asc", "first_name")}
                                    className="fa-solid fa-up-long"></i>
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>
                            Last Name
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>
                            Action
                        </div>
                    </th>

                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`users-${index}`} >
                                <td className='text-center'>{item.id}</td>
                                <td className='text-center'>{item.email}</td>
                                <td className='text-center'>{item.first_name}</td>
                                <td className='text-center'>{item.last_name}</td>
                                <td className='text-center'>
                                    <Button className='btn btn-warning mx-3'
                                        onClick={() => { handleEditUserShow(item) }}
                                    >Edit</Button>
                                    <Button className='btn btn-danger'
                                        onClick={() => { handleDeleteUserShow(item) }}
                                    >Delete</Button>
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </Table >

        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"

            marginPagesDisplayed={2}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />

        <ModalAddNew
            show={isShow}
            handleClose={handleClose}
            handleUpdateUser={handleUpdateUser}
        />
        <ModalEditUser
            show={isEditShow}
            handleEditUserClose={handleEditUserClose}
            dataUserEdit={dataUserEdit}
            handleEditUserFromModal={handleEditUserFromModal}
        />
        <ModalConfirm
            show={isModalDeleteShow}
            handleModalDeleteClose={handleModalDeleteClose}
            handleConfirmDeletefromModal={handleConfirmDeletefromModal}
            dataUserDelete={dataUserDelete}


        />

    </>)
}
export default TableUsers;