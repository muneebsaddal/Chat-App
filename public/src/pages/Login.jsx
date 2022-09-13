import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		username: "",
		password: "",
	});
	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: false,
		draggable: true,
		theme: "dark",
	};

	useEffect(() => {
		if (localStorage.getItem("chat-app-user")) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			const { password, username } = values;
			const { data } = await axios.post(loginRoute, {
				username,
				password,
			});
			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}
			if (data.status === true) {
				localStorage.setItem(
					"chat-app-user",
					JSON.stringify(data.user)
				);
				navigate("/");
			}
		}
	};

	const handleValidation = () => {
		const { password, username } = values;

		if (username === "") {
			toast.error("Username is required", toastOptions);
			return false;
		} else if (password === "") {
			toast.error("Password is required", toastOptions);
			return false;
		}
		return true;
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	return (
		<>
			<FormContainer>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className="brand">
						<h1>CHAT APP</h1>
					</div>
					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					<button type="submit">Login</button>
					<span>
						Don't have an account?{" "}
						<Link to="/register">Register</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
};

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background-color: #000000;
	.brand {
		text-align: center;
		h1 {
			color: white;
			text-transformation: uppercase;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #121212;
		border-radius: 2rem;
		padding: 3rem 5rem;
		input {
			background-color: transparent;
			padding: 1rem;
			border: 0.1rem solid #555;
			border-radius: 0.4rem;
			color: white;
			width: 100%;
			font-size: 1rem;
			&:focus {
				outline: none;
			}
		}
		button {
			background-color: #222;
			color: white;
			padding: 1rem 2rem;
			border: none;
			font-weight: bold;
			cursor: pointer;
			border-radius: 0.4rem;
			font-size: 1rem;
			text-transform: uppercase;
			transition: 0.5s ease-in-out;
			&:hover {
				background-color: #444;
			}
		}
		span {
			text-align: center;
			color: #ddd;
			text-transform: uppercase;
			a {
				color: #fff;
				text-decoration: none;
				font-weight: bold;
			}
		}
	}
`;

export default Login;
