import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Form } from "react-bootstrap";
import UserPosition from './UserPosition';
import './Search.css';

const Search = ({originRef, destiantionRef}) => {
    return (
        <div className='autocomplete-container'>
        <div className='start-point-container'>
          <Autocomplete>
            <Form.Control
              className='origin-text'
              type='text'
              placeholder='Origin'
              ref={originRef}
            />
          </Autocomplete>
          <UserPosition setOriginRef={originRef} />
        </div>
        <Autocomplete>
          <Form.Control
            className='destination-text'
            type='text'
            placeholder='Destination'
            ref={destiantionRef}
          />
        </Autocomplete>
        <span style={{ marginLeft: '25px' }}></span>
      </div>
    );
}

export default Search;