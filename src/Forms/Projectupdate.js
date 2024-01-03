import React from 'react';
import '../Styles/Projectcreate.css';

function Projectupdate() {
  return (
    <div className='form-body'>
        <div class="form">
          <div class="form-title">Update project</div>
          <div class="form-subtitle">Update your new project!</div>
          <div class="input-container ic1">
            <input id="firstname" class="input" type="text" placeholder=" " />
            <div class="cut">Name</div>
            <label for="firstname" class="placeholder">Project name</label>
          </div>
          <div class="input-container ic2">
            <input id="lastname" class="input" type="text" placeholder=" " />
            <div class="cut">Description</div>
            <label for="lastname" class="placeholder">Add small description</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" type="text" placeholder=" " />
            <div class="cut ">Project manager</div>
            <label for="email" class="placeholder">Add project manager</label>
          </div>
          <button type="text" class="submit">Update</button>
        </div>
    </div>
  )
}

export default Projectupdate