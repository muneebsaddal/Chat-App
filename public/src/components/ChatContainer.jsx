import React from "react";
import styled from "styled-components";
import { createMarkup } from "../pages/SetAvatar";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";

const ChatContainer = ({ currentChat }) => {
	const handleSendMessage = async (message) => {
		alert(message);
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
					<Messages />
					<ChatInput handleSendMessage={handleSendMessage} />
				</Container>
			)}
		</>
	);
};

export default ChatContainer;

const Container = styled.div`
	.chat-header {
		height: 10%;
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
`;
