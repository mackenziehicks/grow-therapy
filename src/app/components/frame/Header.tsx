import { Component } from 'react';
import { HeaderEnum } from './Header.enum.ts';

class Header extends Component {
  render() {
    return (
      <header className="tw-bg-slate-50 tw-p-6 tw-flex tw-justify-between tw-w-full">
        <h1>{HeaderEnum.TITLE}</h1>
        <img src={HeaderEnum.LOGO} alt="Grow Therapy Logo" />
      </header>
    );
  }
}

export default Header;
