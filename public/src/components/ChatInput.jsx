import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMessage }) => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [message, setMessage] = useState("");

	const handleEmojiPickerVisibility = () => {
		setShowEmojiPicker((prevState) => !prevState);
	};
	const handleEmojiClick = (event, emojiObject) => {
		let msg = message;
		msg += emojiObject.emoji;
		setMessage(msg);
	};
	const sendChat = (event) => {
		event.preventDefault();
		if (message.length > 0) {
			handleSendMessage(message);
			setMessage("");
		}
	};
	return (
		<Container>
			<div className="button-container">
				<div className="emoji">
					<BsEmojiSmileFill onClick={handleEmojiPickerVisibility} />
					{showEmojiPicker && (
						<Picker onEmojiClick={handleEmojiClick} />
					)}
				</div>
			</div>
			<form className="input-container" onSubmit={(e) => sendChat(e)}>
				<input
					type="text"
					placeholder="type your message here"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className="submit">
					<IoMdSend />
				</button>
			</form>
		</Container>
	);
};

export default ChatInput;

const Container = styled.div`
	display: grid;
	grid-template-columns: 5% 95%;
	align-items: center;
	background-color: #090909;
	padding: 0.5rem 2rem;
	.button-container {
		display: flex;
		color: white;
		gap: 1rem;
		.emoji {
			position: relative;
			svg {
				font-size: 2rem;
				color: #d3d3d3;
				cursor: pointer;
			}
			.emoji-picker-react {
				position: absolute;
				top: -350px;
				box-shadow: none;
				background-color: #090909;
				border-color: #333;
				.emoji-scroll-wrapper::-webkit-scrollbar {
					background-color: #090909;
					width: 5px;
					&-thumb {
						background-color: #999;
						border-radius: 2px;
					}
				}
				.emoji-categories {
					button {
						filter: contrast(0);
					}
				}
				.emoji-search {
					background-color: transparent;
					border-color: #444;
				}
				.emoji-group:before {
					background-color: #090909;
				}
			}
		}
	}
	.input-container {
		width: 100%;
		border-radius: 2rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		background-color: #212121;
		input {
			width: 100%;
			background-color: transparent;
			color: white;
			border: none;
			padding-left: 1rem;
			font-size: 1.2rem;
			&::selection {
				background-color: #888;
			}
			&:focus {
				outline: none;
			}
		}
		button {
			padding: 0.5rem 1.5rem;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #ddd;
			border: none;
			svg {
				font-size: 2rem;
				color: #121212;
			}
		}
	}
`;
