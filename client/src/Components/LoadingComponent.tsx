/** @format */

export default function LoadingComponent(props: any): JSX.Element {
	if (props.reason) {
		return <p>{props.reason}</p>;
	}

	return <p>Loading...</p>;
}
