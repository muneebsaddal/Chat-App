import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { createMarkup } from "../pages/SetAvatar";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

const ChatContainer = ({ currentChat, currentUser }) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		async function getAllMessages() {
			if (currentUser && currentChat) {
				axios
					.post(getAllMessagesRoute, {
						from: currentUser._id,
						to: currentChat._id,
					})
					.then((result) => setMessages(result.data));
			}
		}
		getAllMessages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat]);

	const handleSendMessage = async (message) => {
		await axios.post(sendMessageRoute, {
			from: currentUser._id,
			to: currentChat._id,
			message: message,
		});
	};

	return (
		<>
			{currentChat && (
				<Container>
					<div className="chat-header">
						<div className="user-details">
							<div className="avatar">
								<section
									dangerouslySetInnerHTML={createMarkup(
										currentChat.avatarImage
									)}
								></section>
							</div>
							<div className="username">
								<h3>{currentChat.username}</h3>
							</div>
						</div>
						<Logout />
					</div>
					<div className="chat-messages">
						{messages.map((message) => {
							return (
								<div key={uuidv4()}>
									<div
										className={`message ${
											message.fromSelf
												? "sent"
												: "received"
										}`}
									>
										<div className="content">
											<p>{message.message}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<ChatInput handleSendMessage={handleSendMessage} />
				</Container>
			)}
		</>
	);
};

export default ChatContainer;

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width:720px) and (max-width:1080px) {
        grid-template-rows: 15% 70% 15%:
    }
	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		background: #090909;
		.user-details {
			display: flex;
			align-items: center;
			gap: 1rem;
			.avatar {
				section {
					height: 3rem;
					width: 3rem;
				}
			}
			.username {
				h3 {
					color: #fff;
					font-size: 1.4rem;
					font-weight: 500;
				}
			}
		}
	}
	.chat-messages {
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		.message {
			display: flex;
			align-items: center;
			.content {
				max-width: 40%;
				overflow-wrap: break-word;
				padding: 1rem;
				font-size: 1.1rem;
				border-radius: 1rem;
				color: #d1d1d1;
			}
		}
		.sent {
			justify-content: flex-end;
			.content {
				background-color: #000000;

			}
		}
        .received {
            justify-content: flex-start;
            .content {
                background-color: #000000;
            }
        }
	}
`;
