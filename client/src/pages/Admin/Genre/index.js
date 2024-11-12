import { useCallback, useEffect, useState } from "react";
import PaginationBookStore from "../../../components/PaginationBookStore";
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { Row, Col, Table, Spinner, Modal, Button } from "react-bootstrap";
import genreApi from "../../../api/genreApi";

function GenreList() {
  const [genreData, setGenreData] = useState({});
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false)

  const [genreDelete, setGenreDelete] = useState({})

  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const [addGenre, setAddGenre] = useState({
    name: "",
  })
  const [selectedGenre, setSelectedGenre] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, pagination } = await genreApi.getAll({ page: page, limit: 10, sortByDate: "desc" });
				console.log(data)
        setLoading(false);
        setGenreData({ genres: data, totalPage: pagination.totalPage });
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
      await genreApi.delete(genreDelete._id);
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
      await genreApi.create(addGenre)
      setLoading(false)
      alert("Thêm thể loại thành công!")
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
      await genreApi.update(selectedGenre?._id, selectedGenre)
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
        <Modal.Title>Cập nhật thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitUpdate}>
            <Row>
              <Col xl={4}>
                <label>Tên thể loại</label>
                <input required type="text" value={selectedGenre?.name} className="form-control"
                  onChange={(e) => setSelectedGenre((prev) => { return { ...prev, name: e.target.value } })}
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
        <Modal.Title>Thêm thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitAdd}>
            <Row>
              <Col xl={4}>
                <label>Tên thể loại</label>
                <input required type="text" value={addGenre?.name} className="form-control"
                  onChange={(e) => setAddGenre((prev) => { return { ...prev, name: e.target.value } })}
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
          <Modal.Title>Xóa thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc xóa thể loại <b>{genreDelete && genreDelete.name}</b> này không?</Modal.Body>
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
          <div className="admin-content-header">Danh sách thể loại</div>
          <div className="admin-content-action">
            <div className="d-flex">
              <button type="button" className="btn btn-success ms-auto" onClick={() => setShowAddModal(true)}>Thêm thể loại</button>
            </div>
          </div>
          <div className="admin-content-body">
            <Table hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thể loại</th>
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
                ) : genreData.genres && genreData.genres.length > 0 ? (
                  genreData.genres.map((item, index) => {
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
                              setSelectedGenre(item)
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
                              setGenreDelete({
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
                    <td colSpan={6}>Không có thể loại nào!</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="admin-content-pagination">
              <Row>
                <Col xl={12}>
                  {genreData.totalPage > 1 ? (
                    <PaginationBookStore
                      totalPage={genreData.totalPage}
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

export default GenreList;
