import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createItem } from "../features/items/itemsSlice";
import { useLocation, testvalue } from "react-router-dom";

import { WithContext as ReactTags } from "react-tag-input";
function CreateItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topic: "",
  });
  const { search } = useLocation();
  const backUrl = new URLSearchParams(search).get("backUrl");

  const [command, setCommand] = useState(backUrl.split(" ")[0]);
  const [collectionID, setCollectionId] = useState(backUrl.split(" ")[1]);

  console.log(command, collectionID);

  const { name } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      //   navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }));
    console.log(tags);
  };
  ////////////////////////////////////////////////////////////////////////////

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = React.useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  //////////////////////////////////////////////////////////////////////////
  const onSubmit = (e) => {
    e.preventDefault();

    const d = {
      collectionID: collectionID,
      name: name,
      tags: tags,
      userID: user._id,
      actionToDo: "add",
    };
    console.log(d);

    dispatch(createItem(d));
    navigate(`/userCollection/${collectionID}?backUrl=${collectionID}`);
  };

  return (
    <div class="container">
      {command === "create" ? <>CREATE ITEM</> : <>EDIT ITEM: {collectionID}</>}
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
              <div>
                <ReactTags
                  tags={tags}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  inputFieldPosition="bottom"
                  // suggestions={suggestions}
                  autocomplete
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                  {command === "create" ? <>CREATE ITEM</> : <> EDIT ITEM</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateItem;
