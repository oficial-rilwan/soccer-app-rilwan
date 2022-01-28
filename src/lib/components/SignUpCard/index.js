import './SignUpCard.scss';

export const SignUpCard = ({ style, ...props }) => {
  return (
    <div className="body-card">
      <div className="card" style={style}>
        {props.children}
      </div>
    </div>
  );
};
