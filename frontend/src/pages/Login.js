import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetUser } from "../features/auth/authSlice";
import { FormattedMessage } from "react-intl";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  useEffect(() => {
    if (isError) {
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(resetUser());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <div class="container">
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
                    type="name"
                    class="form-control"
                    id="name"
                    aria-describedby="name"
                    placeholder="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                    <FormattedMessage id={"app.header.login"}>
                    </FormattedMessage>
                  </button>
                </div>
                <div
                  id="emailHelp"
                  class="form-text text-center mb-5 text-dark"
                >
                  <FormattedMessage id={"app.login.notRegistered"}>
                  </FormattedMessage>
                  <Link to="/register">
                    <a href="#" class="text-dark fw-bold">
                      <FormattedMessage id={"app.login.createAccount"}>
                      </FormattedMessage>
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
