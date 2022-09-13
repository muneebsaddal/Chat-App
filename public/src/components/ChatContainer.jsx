import React from "react";
import styled from "styled-components";
import { createMarkup } from "../pages/SetAvatar";

const ChatContainer = ({ currentChat }) => {
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
					</div>
				</Container>
			)}
		</>
	);
};

export default ChatContainer;

const Container = styled.div`
	padding-top: 1rem;
	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
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
					color: white;
				}
			}
		}
	}
`;
