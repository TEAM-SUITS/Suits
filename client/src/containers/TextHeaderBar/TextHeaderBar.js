import HeaderBar from '../HeaderBar/HeaderBar';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */
export default function TextHeaderBar({ page }) {
  switch (page) {
    case 'home':
      return (
        <HeaderBar>
          <Link to="/">
            <span className="bold">SUITS</span>
          </Link>
        </HeaderBar>
      );

    case 'liked':
      return (
        <HeaderBar>
          <span className="light">Following</span>
        </HeaderBar>
      );

    case 'profile':
      return (
        <HeaderBar>
          <span className="light">Profile</span>
        </HeaderBar>
      );

    default:
      return (
        <HeaderBar>
          <Link to="/">
            <span className="bold">SUITS</span>
          </Link>
        </HeaderBar>
      );
  }
}