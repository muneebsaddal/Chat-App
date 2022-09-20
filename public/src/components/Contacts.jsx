import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createMarkup } from "../pages/SetAvatar";

const Contacts = ({ contacts, currentUser, changeChat }) => {
	const [currentUsername, setCurrentUsername] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	const [searchString, setSearchString] = useState("");

	useEffect(() => {
		if (currentUser) {
			setCurrentUsername(currentUser.username);
			setCurrentUserImage(currentUser.avatarImage);
		}
	}, [currentUser]);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	const handleSearch = (e) => {
		setSearchString(e.target.value.toLowerCase());
	};

	const SearchedContacts = contacts.filter(
		(contact) => !contact.username.toLowerCase().indexOf(searchString)
	);

	return (
		<>
			{currentUserImage && currentUsername && (
				<Container>
					<div className="brand">
						<h3>Chat app</h3>
					</div>
					<div className="search">
						<input
							id="search"
							placeholder="Search"
							type="text"
							name="Search"
							onChange={handleSearch}
						/>
					</div>
					<div className="contacts">
						{SearchedContacts.map((contact, index) => {
							return (
								<div
									className={`contact ${
										index === currentSelected
											? "selected"
											: ""
									}`}
									key={index}
									onClick={() =>
										changeCurrentChat(index, contact)
									}
								>
									<div className="avatar">
										<section
											dangerouslySetInnerHTML={createMarkup(
												contact.avatarImage
											)}
										></section>
									</div>
									<div className="username">
										<h3>{contact.username}</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className="current-user">
						<div className="avatar">
							<section
								dangerouslySetInnerHTML={createMarkup(
									currentUserImage
								)}
							></section>
						</div>
						<div className="username">
							<h2>{currentUsername}</h2>
						</div>
					</div>
				</Container>
			)}
		</>
	);
};

export default Contacts;

const Container = styled.div`
	display: grid;
	grid-template-row: 15% 10% 60% 15%;
	overflow: hidden;
	background-color: #090909;
	.brand {
		text-align: center;
		margin: 1rem;
		max-height: 5rem;
		margin-bottom: auto;
		h3 {
			color: white;
			text-transform: uppercase;
			font-size: 2rem;
			font-weight: 600;
		}
	}
	.search {
		display: flex;
		flex-direction: column;
		align-items: center;
		input {
			margin: 1rem 0;
			padding-left: 1rem;
			width: 90%;
			height: 3rem;
			border: 1px solid #333;
			border-radius: 0.2rem;
			background-color: #222;
			color: white;
			font-size: 1.2rem;
			&::selection {
				background-color: #888;
			}
			&:focus {
				outline: none;
			}
		}
	}
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		max-height: 97%;
		gap: 0.8rem;
		margin-bottom: auto;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #dddddd;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.contact {
			background-color: #222;
			min-height: 5rem;
			width: 90%;
			cursor: pointer;
			border-radius: 0.2rem;
			padding: 1rem;
			gap: 1rem;
			align-items: center;
			display: flex;
			transition: 0.5s ease-in-out;
			.avatar {
				section {
					height: 3rem;
					width: 3rem;
				}
			}
			.username {
				h3 {
					color: white;
					font-size: 1.2rem;
					font-weight: 500;
				}
			}
		}
		.selected {
			background-color: #555;
		}
	}
	.current-user {
		background-color: #222;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1.5rem;
		margin: 1rem;
		padding: 1rem 2rem;
		max-height: 5rem;
		margin-top: auto;
		border-radius: 0.2rem;
		.avatar {
			section {
				height: 4rem;
				width: 4rem;
				max-inline-size: 100%;
			}
		}
		.username {
			h2 {
				color: white;
				font-size: 1.5rem;
				font-weight: 500;
			}
		}
		@media screen and (min-width: 720px) and (max-width: ) {
			gap: 0.5rem;
			.username {
				h2 {
					font-size: 1rem;
				}
			}
		}
	}
`;
