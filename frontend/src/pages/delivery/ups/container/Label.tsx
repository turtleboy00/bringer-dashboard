import { useLocation } from "react-router-dom";

interface UPS {
  cost: Object;
  label: string;
  tracking: string;
}


const Label = () => {
	const { state } = useLocation();
  const ups = state as UPS;
	
	let { label } = ups;

  return (
    <>
				<h1>Label</h1>
				<div className="m-10">
					<img src={ `data:image/png;base64, ${label}` } alt="Label" />
				</div>
    </>
  );
};

export default Label;
