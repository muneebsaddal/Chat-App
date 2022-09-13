import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = () => {
	return (
		<Container>
			<img src={Robot} alt="Robot" />
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
	color: white;
	img {
		height: 20rem;
	}
`;
