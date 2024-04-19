import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Label from "../../../components/Label/Label";
import Input from "../../../components/Input/Input";
import Textarea from "../../../components/Textarea/Textarea";
import Error from "../../../components/Error/Error";
import Button from "../../../components/Button/Button";
import axios from "../../../lib/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import API from "../../../constants/api";

const schema = z.object({
  name: z.string().min(5),
  category: z.string(),
  description: z.string().min(20),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  price: z.coerce.number().nonnegative(),
});

export default function AddCourse() {
  const navigate = useNavigate();

  const preview = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Python for Beginners",
      category: "Programming",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
      level: "beginner",
      price: 0,
    },
  });

  const uploadImage = (e, setImage) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("level", data.level);
      formData.append("photo", image);
      formData.append("status", 1);
      formData.append("rating", 5);

      const { data: result } = await axios.post(
        `${API.used}/courses`,
        formData,
        {}
      );
      Swal.fire("Success", result.message, "success");
      setIsLoading(false);
      navigate("/course", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError)
        Swal.fire("Error", error.response.data.message, "error");
      else Swal.fire("Error", error.message, "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h1 className="fs-2 fw-bold" style={{ color: "#1c4a78" }}>
            Create Courses
          </h1>
          <p
            className="text-muted"
            style={{
              width: "100%",
              maxWidth: "40rem",
            }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium unde necessitatibus, praesentium aspernatur.
          </p>
        </div>
      </div>

      <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
        <div
          onClick={() => preview.current.click()}
          style={{
            width: "100%",
            overflow: "hidden",
            aspectRatio: "16/9",
            backgroundColor: "#e1e1e1",
            cursor: "pointer",
            position: "relative",
          }}
          className="rounded-3 mb-4"
        >
          <input
            type="file"
            ref={preview}
            style={{ display: "none" }}
            onChange={(e) => uploadImage(e, setImage)}
            accept="image/jpeg"
          />

          {!image && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <i className="fas fa-image" style={{ fontSize: "2rem" }}></i>
            </div>
          )}

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <p className="text-danger">{errors?.image?.message}</p>

        <div className="mb-3">
          <Label htmlFor="name">name</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Complete course name"
          />
          <Error>{errors?.name?.message}</Error>
        </div>

        <div className="mb-3">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            {...register("category")}
            placeholder="Complete course category"
          />
          <Error>{errors?.category?.message}</Error>
        </div>

        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Complete course description"
            rows={8}
          />
          <Error>{errors?.description?.message}</Error>
        </div>

        <div className="mb-3">
          <Label htmlFor="level">Level</Label>
          <select id="level" {...register("level")} className="form-select">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <Error>{errors?.level?.message}</Error>
        </div>

        <div className="mb-5">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price")}
            placeholder="Complete course price"
          />
          <Error>{errors?.price?.message}</Error>
        </div>

        <Button type="submit" className="py-2 px-3" isLoading={isLoading}>
          <span>Submit Course</span>
        </Button>
      </form>
    </>
  );
}
