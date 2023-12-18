import { useNavigate, useLocation } from 'react-router-dom';
import history from '~/utils/navigateSite';
import PropTypes from 'prop-types';

function GlobalNavigate({ children }) {
  history.navigate = useNavigate();
  history.location = useLocation();
  return children;
}

GlobalNavigate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalNavigate;
