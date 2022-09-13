import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { createMarkup } from "../pages/SetAvatar";

const Contacts = ({ contacts, currentUser, changeChat }) => {
	const [currentUsername, setCurrentUsername] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
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
	return (
		<>
			{currentUserImage && currentUsername && (
				<Container>
					<div className="brand">
						<img src={Logo} alt="logo" />
						<h3>Chat app</h3>
					</div>
					<div className="contacts">
						{contacts.map((contact, index) => {
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
	grid-template-row: 10% 75% 15%;
	overflow: hidden;
	background-color: #080420;
	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin: 1rem;
        max-height: 5rem;
        margin-bottom: auto;
		img {
			height: 2rem;
		}
		h3 {
			color: white;
			text-transform: uppercase;
		}
	}
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
        margin-bottom: auto;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.contact {
			background-color: #ffffff39;
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
				}
			}
		}
		.selected {
			background-color: #9186f3;
		}
	}
	.current-user {
		background-color: #0d0d30;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		margin: 1rem;
        max-height: 5rem;
        margin-top: auto;
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
