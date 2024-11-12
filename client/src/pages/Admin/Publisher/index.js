import { useCallback, useEffect, useState } from "react";
import PaginationBookStore from "../../../components/PaginationBookStore";
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { Row, Col, Table, Spinner, Modal, Button } from "react-bootstrap";
import publisherApi from "../../../api/publisherApi";

function PublisherList() {
  const [publisherData, setPublisherData] = useState({});
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false)

  const [publisherDelete, setPublisherDelete] = useState({})

  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const [addPublisher, setAddPublisher] = useState({
    name: "",
  })
  const [selectedPublisher, setSelectedPublisher] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, pagination } = await publisherApi.getAll({ page: page, limit: 10, sortByDate: "desc" });
				console.log(data)
        setLoading(false);
        setPublisherData({ publishers: data, totalPage: pagination.totalPage });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [page, rerender]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  const handleCallApiDelete = async (e) => {
    try {
      await publisherApi.delete(publisherDelete._id);
      setShowModal(false)
      alert("Xóa thành công!")
      setRerender(!rerender)
    } catch (error) {
      alert("Xóa thất bại!")
      setShowModal(false)
    }
  }

  const handleSubmitAdd = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await publisherApi.create(addPublisher)
      setLoading(false)
      alert("Thêm nhà xuất bản thành công!")
      setRerender(!rerender)
      setShowAddModal(false)
    } catch (error) {
      setLoading(false)
      alert("That bai! ", error)
      console.log(error);
    }
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await publisherApi.update(selectedPublisher?._id, selectedPublisher)
      setLoading(false)
      alert("Cập nhật thành công!")
      setRerender(!rerender)
      setShowUpdateModal(false)
    } catch (error) {
      setLoading(false)
      alert("That bai! ", error)
      console.log(error);
    }
  }

  return (
    <Row>
      <Modal size="lg" show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Cập nhật nhà xuất bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitUpdate}>
            <Row>
              <Col xl={4}>
                <label>Tên nhà xuất bản</label>
                <input required type="text" value={selectedPublisher?.name} className="form-control"
                  onChange={(e) => setSelectedPublisher((prev) => { return { ...prev, name: e.target.value } })}
                />
              </Col>
            </Row>
            <Button disabled={loading} type="submit" variant="danger" className="mt-2">
              Lưu
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Thêm nhà xuất bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitAdd}>
            <Row>
              <Col xl={4}>
                <label>Tên nhà xuất bản</label>
                <input required type="text" value={addPublisher?.name} className="form-control"
                  onChange={(e) => setAddPublisher((prev) => { return { ...prev, name: e.target.value } })}
                />
              </Col>
            </Row>
            <Button disabled={loading} type="submit" variant="danger" className="mt-2">
              Lưu
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa nhà xuất bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc xóa nhà xuất bản <b>{publisherDelete && publisherDelete.name}</b> này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleCallApiDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <Col xl={12}>
        <div className="admin-content-wrapper">
          <div className="admin-content-header">Danh sách nhà xuất bản</div>
          <div className="admin-content-action">
            <div className="d-flex">
              <button type="button" className="btn btn-success ms-auto" onClick={() => setShowAddModal(true)}>Thêm nhà xuất bản</button>
            </div>
          </div>
          <div className="admin-content-body">
            <Table hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>nhà xuất bản</th>
                  <th colSpan="2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3}>
                      <Spinner
                        animation="border"
                        variant="success"
                      />
                    </td>
                  </tr>
                ) : publisherData.publishers && publisherData.publishers.length > 0 ? (
                  publisherData.publishers.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                        <td>
                          {item.name} 
                        </td>
                        
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => {
                              setSelectedPublisher(item)
                              setShowUpdateModal(true)
                            }}
                          >
                            <FaEdit />
                          </Button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setPublisherDelete({
                                _id: item._id,
                                name: item.name
                              })
                              setShowModal(true)
                            }}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>Không có nhà xuất bản nào!</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="admin-content-pagination">
              <Row>
                <Col xl={12}>
                  {publisherData.totalPage > 1 ? (
                    <PaginationBookStore
                      totalPage={publisherData.totalPage}
                      currentPage={page}
                      onChangePage={handleChangePage}
                    />
                  ) : null}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default PublisherList;
