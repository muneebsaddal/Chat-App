import React from "react";
import styled from "styled-components";
import { createMarkup } from "../pages/SetAvatar";

const UserProfile = ({ currentUser }) => {
	return (
		<Container>
			<div className="user-image">
				<section
					dangerouslySetInnerHTML={createMarkup(
						currentUser.avatarImage
					)}
				></section>
			</div>
			<div className="username">{currentUser.username}</div>
			<div className="email">{currentUser.email}</div>
		</Container>
	);
};

export default UserProfile;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: white;
	.user-image {
		> section {
			> svg {
				height: 15rem;
				width: 15rem;
			}
		}
        margin-bottom: 2rem;
	}
	.username {
		font-size: 3rem;
        font-weight: 500;
    }
    .email {
        font-size: 2rem;
        color: #bbb;
        font-weight: 400;
    }
`;
