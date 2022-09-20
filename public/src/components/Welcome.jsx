import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

const Welcome = ({ currentUser }) => {
	return (
		<Container>
			<div className="logout-container">
				<Logout />
			</div>
			<div className="content">
				<img src={Robot} alt="Robot" />
				<h1>
					Welcome, <span>{currentUser.username}</span>
				</h1>
				<h3>Please select a Contact to start Chat</h3>
			</div>
		</Container>
	);
};

export default Welcome;

const Container = styled.div`
	.logout-container {
		display: flex;
        justify-content: flex-end;
        margin: 1rem 1rem 0 0;
	}
	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
        height: 85%;
		color: #ccc;
		h1 {
			font-size: 2rem;
			font-weight: 500;
		}
		h3 {
			font-size: 1.4rem;
			font-weight: 500;
		}
		img {
			height: 20rem;
		}
	}
`;
