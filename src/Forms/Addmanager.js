import React from 'react';
import '../Styles/Projectcreate.css'

function Addmanager() {
  return (
   <div className='form-body'>
        <div class="form">
          <div class="form-title">Add manager</div>
          <div class="form-subtitle">Add your project manager!</div>
          <div class="input-container ic1">
            <input id="firstname" class="input" type="text" placeholder=" " />
            <div class="cut">Name</div>
            <label for="firstname" class="placeholder">Project name</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" type="text" placeholder=" " />
            <div class="cut ">Project manager</div>
            <label for="email" class="placeholder">Add project manager</label>
          </div>
          <button type="text" class="submit">Add</button>
        </div>
    </div>
  )
}

export default Addmanager