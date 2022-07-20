import { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className="tw-bg-slate-50 tw-p-6 tw-flex tw-justify-between tw-w-full">
        <h1>Grow Take Home - Mackenzie Hicks</h1>
        <img
          src={'https://growtherapy.com/wp-content/uploads/2022/04/Full-Logo.svg'}
          alt="Grow Therapy Logo"
        />
      </header>
    )
  }
}

export default Header
