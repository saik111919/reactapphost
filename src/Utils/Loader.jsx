import PropType from "prop-types";
const Loader = ({ loader }) => {
  return (
    loader && (
      <div className='loader'>
        <div
          className='spinner-grow'
          style={{ width: "3rem", height: "3rem" }}
          role='status'
        >
          <span className='sr-only visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  );
};

Loader.propTypes = {
  loader: PropType.bool.isRequired,
};

export default Loader;
