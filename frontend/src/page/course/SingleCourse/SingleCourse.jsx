import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { formatCurrency } from "../../../lib/formatter";
import Button from "../../../components/Button/Button";
import axios from "../../../lib/axios";
import Swal from "sweetalert2";

export default function SingleCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, loading, error } = useFetch(`/courses/${id}`);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      setDeleteLoading(true);
      if (result.isConfirmed) {
        axios.delete(`/courses/${id}`).then(() => {
          setDeleteLoading(false);
          Swal.fire("Deleted!", "Your course has been deleted.", "success");
          navigate("/course", { replace: true });
        });
      }
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h1 className="fs-2 fw-bold" style={{ color: "#1c4a78" }}>
            {loading ? "Loading..." : course.name}
          </h1>
        </div>
        <div className="d-flex align-items-end">
          <Link to={`/course/${id}/update`} className="text-decoration-none">
            <Button className="py-2 px-3">
              <i className="fas fa-edit me-2"></i>
              <span
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                Edit Course
              </span>
            </Button>
          </Link>
          <Button
            isLoading={deleteLoading}
            className="py-2 px-3 ms-3 bg-danger"
            onClick={handleDelete}
          >
            <i className="fas fa-trash me-2"></i>
            <span
              style={{
                whiteSpace: "nowrap",
              }}
            >
              Delete Course
            </span>
          </Button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "2rem",
        }}
      >
        {!loading && (
          <img
            src={course.photo || "/course.png"}
            alt={course.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column align-items-start">
            <div
              className="rounded-0 mb-2"
              style={{
                color: "#8C94A3",
                backgroundColor: "#CED1D9",
                padding: "0.25rem 0.5rem",
                fontWeight: "500",
                fontSize: "0.8rem",
              }}
            >
              {course.category}
            </div>
            <h3 className="fs-4 fw-bold">Tentang Kurus</h3>
          </div>

          <span
            className="fw-bold"
            style={{
              color: "#1c4a78",
            }}
          >
            {loading
              ? "Loading..."
              : course.price > 0
              ? formatCurrency(course.price)
              : "Free"}
          </span>
        </div>

        <p
          className="text-muted"
          style={{
            whiteSpace: "pre-line",
            marginTop: "1rem",
          }}
        >
          {loading ? "Loading..." : String(course.description)}
        </p>
      </div>
    </>
  );
}
