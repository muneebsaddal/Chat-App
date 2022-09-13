import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
	return (
		<Container>
			<img src={Robot} alt="Robot" />
			<h1>
				Welcome, <span>{currentUser.username}</span>
			</h1>
			<h3>Please select a Contact to start Chat</h3>
		</Container>
	);
};

export default Welcome;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
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
`;
