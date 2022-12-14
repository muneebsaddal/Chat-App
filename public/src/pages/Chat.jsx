/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { io } from "socket.io-client";

import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import UserProfile from "../components/UserProfile";

const Chat = () => {
	const socket = useRef();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);
	const [userProfile, setUserProfile] = useState(true);

	const handleUserProfileState = () => {
		setUserProfile((prevState) => !prevState);
	};

	useEffect(() => {
		async function setUser() {
			if (!localStorage.getItem("chat-app-user")) {
				navigate("/login");
			} else {
				setCurrentUser(
					await JSON.parse(localStorage.getItem("chat-app-user"))
				);
				setIsLoaded(true);
			}
		}
		setUser();
	}, []);

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host, {
				withCredentials: true,
			});
			socket.current.emit("add-user", currentUser._id);
		}
	}, [currentUser]);

	useEffect(() => {
		async function setContact() {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const data = await axios.get(
						`${allUsersRoute}/${currentUser._id}`
					);
					setContacts(data.data);
				} else {
					navigate("setAvatar");
				}
			}
		}
		setContact();
	}, [currentUser]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};
	return (
		<Container>
			<div className="container">
				<Contacts
					contacts={contacts}
					currentUser={currentUser}
					changeChat={handleChatChange}
					handleUserProfileState={handleUserProfileState}
				/>
				{isLoaded && userProfile === true ? (
					<UserProfile currentUser={currentUser}/>
				) : isLoaded && currentChat === undefined ? (
					<Welcome currentUser={currentUser} />
				) : (
					<ChatContainer
						currentChat={currentChat}
						currentUser={currentUser}
						socket={socket}
					/>
				)}
			</div>
		</Container>
	);
};

export default Chat;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #000000;
    .container {
        height: 90vh;
        width: 95vw;
        background-color: #121212;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width:720px) and (max-width:1080px) {
            grid-template-columns: 35% 65%:
        }
    }
`;
