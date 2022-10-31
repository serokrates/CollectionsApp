import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createCollection,
  editCollection,
} from "../features/collections/collectionsSlice";

function CreateCollection() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topic: "",
  });
  const { search } = useLocation();
  const backUrl = new URLSearchParams(search).get("backUrl");

  const [command, setCommand] = useState(backUrl.split(" ")[0]);
  const [collectionID, setCollectionId] = useState(backUrl.split(" ")[1]);
  const [userID, setUserId] =  useState(backUrl.split(" ")[2]);

  console.log(command,collectionID,userID);

  const { name, description, topic } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    let d =''
    e.preventDefault();

    const collectionData = {
      name,
      description,
      topic,
    };

    if(userID!==undefined){
      d = [
        { userID: userID },
        { data: collectionData },
        { collectionID: collectionID },
      ];
    }else if(userID===undefined){
      d = [
        { userID: collectionID },
        { data: collectionData },
        { collectionID: collectionID },
      ];
    }

    console.log(d);
    {
      command === "create"
        ? dispatch(createCollection(d))
        : dispatch(editCollection(d));
    }

    navigate(-1);
  };

  return (
    <div class="container">
      {command === "create" ? (
        <>CREATE COLLECTION</>
      ) : (
        <>EDIT COLLECTION: {collectionID}</>
      )}
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card my-5">
            <form class="card-body cardbody-color p-lg-5" onSubmit={onSubmit}>
              <div class="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="name"
                  onChange={onChange}
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="description"
                  onChange={onChange}
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="topic"
                  name="topic"
                  value={topic}
                  placeholder="topic"
                  onChange={onChange}
                />
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                  {command === "create" ? (
                    <>CREATE COLLECTION</>
                  ) : (
                    <> EDIT COLLECTION</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCollection;
