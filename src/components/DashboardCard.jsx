const DashboardCard = ({ title, description, link, isActive }) => {
  const cardContent = (
    <div className={`dashboard-card ${!isActive ? 'inactive' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      {!isActive && <span className="coming-soon">Coming Soon</span>}
    </div>
  );

  return isActive ? (
    <a href={link} className="card-link">
      {cardContent}
    </a>
  ) : (
    cardContent
  );
};

export default DashboardCard; 