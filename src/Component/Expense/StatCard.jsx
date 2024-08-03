import PropTypes from "prop-types";
const StatCard = ({ title, value, icon: Icon, iconColor }) => (
  <div className='flex-1 min-w-[150px] bg-inherit text-inherit border  shadow-md'>
    <div className='p-4 flex items-center justify-between'>
      <div className='flex flex-col text-left'>
        <span className='text-lg font-medium'>{title}</span>
        <span className='text-xl font-bold'>{value}₹</span>
      </div>
      <Icon className={`text-2xl ${iconColor}`} />
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired, // 'elementType' is used for components
  iconColor: PropTypes.string,
};

export default StatCard;
