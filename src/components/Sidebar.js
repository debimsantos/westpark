import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
import '../App.css';

class Sidebar extends Component {
  render() {
    return (
      <Menu>
        <div className='search-venue-wrapper'>
        <div className="search-venue-input-wrapper">
          <input
            type="text"
            placeholder="Search Trails"
          />
        </div>

        <div>
          TRAILS LIST
        </div>

        </div>
      </Menu>
    );
  }
}

export default Sidebar;

