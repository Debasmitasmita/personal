import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import useAxiosPrivate from "../services/hooks/axiosPrivateHooks";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const privetApi = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await privetApi.get("/auth/getUsers");
        setData(resData.data);
      } catch (error) {
        // setError(error.message); // Set the error message
        console.log(error);
        alert(error.message);
      }
    };

    fetchData();
  }, [privetApi]);

  const handleLogout = async () => {
    try {
      const logout = await privetApi.post("/auth/logout");
      console.log(logout);
      if (logout.status == 200) {
        console.log(logout);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      navigate("/login");
    }
  };
  const fetch = async () => {
    try {
      const resData = await privetApi.get("/auth/getUsers");
      setData(resData.data);
    } catch (error) {
      // setError(error.message); // Set the error message
      console.log(error);
      alert(error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <div className=" text-center mt-3">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="danger" onClick={fetch}>
          Fetch
        </Button>
      </div>
      <h1 className="text-center mb-4 text-gray">Register Data</h1>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="bg-secondary text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={indexOfFirstItem + index + 1}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default Dashboard;
